import { NextResponse } from "next/server";
import { ethers } from "ethers";
import ERC20_ABI from '@/app/services/wagmi/ERC20/ERC20_ABI.json';
import setting from '@/app/config/conf/setting.json';

interface PrizeRequestBody {
  address: string;
  totalPoints: number;
}

export async function POST(req: Request) {
  const { address, totalPoints }: PrizeRequestBody = await req.json();

  if (!address) return NextResponse.json({ success: false, message: 'No address provided.' });

  try {
    const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_LINK_PROJECT_ID_SEPOLIA || setting.PUBLIC_ACCESS.RPC_Endpoint);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY || setting.PUBLIC_ACCESS.PRIVATE_KEY, provider);
    const token = new ethers.Contract(process.env.TOKEN_ADDRESS || setting.PUBLIC_ACCESS.CONTRACT_ADDRESS, ERC20_ABI, wallet);

    const tx = await token.transfer(address, ethers.parseUnits(totalPoints.toString(), 18));
    await tx.wait();

    return NextResponse.json({ success: true, txHash: tx.hash });
  } catch (error: unknown) {
    console.error(error);
    if (
      typeof error === "object" &&
      error !== null &&
      "error" in error &&
      typeof (error as { error?: { message?: string } }).error?.message === "string" &&
      ((error as { error?: { message?: string } }).error?.message as string).includes("already known")
    ) {
      return NextResponse.json({ success: true, message: "Rewards already sent or pending confirmation." });
    }
    return NextResponse.json({ success: false, message: "Something went wrong." });
  }
}
