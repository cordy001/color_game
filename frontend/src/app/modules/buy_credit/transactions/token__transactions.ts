import { ethers, parseUnits } from 'ethers';
import config from '@/app/config/conf/setting.json';
import tokenAbi from '@/app/services/wagmi/ERC20/ERC20_ABI.json';
import SweetAlert2 from '@/app/modules/utilities/SweetAlerts';

const tokenAddress = process.env.NEXT_PUBLIC_LACOcoinAddress || config.PUBLIC_ACCESS.CONTRACT_ADDRESS;
const platformAddress = process.env.NEXT_PUBLIC_PLATFORM_ADDRESS || config.PUBLIC_ACCESS.PLATFORM_ADDRESS;

export default async function WagmiTransferToken(address: string, cost: number | string) {
  if (!address) return SweetAlert2(
      'Error',
      'Please connect your wallet.',
      'error',
      true,
      false
  );

  SweetAlert2(
    'Processing...',
    "Transactions is Processings",
    'info',
    false,
    true
  );

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, signer);

    const decimals = 18;
    const amount = parseUnits(String(cost), decimals);

    const balance = await tokenContract.balanceOf(await signer.getAddress());
    if (balance < amount) {
      await SweetAlert2(
        'Insufficient Funds',
        `You do not have enough LCC tokens to complete this transaction.`,
        'warning',
        true,
        false
      );
      return false;
    }

    const tx = await tokenContract.transfer(platformAddress, amount);
    const receipt = await tx.wait();

    if (receipt) {
      await SweetAlert2(
        'Transaction Complete',
        `Transaction Complete with ${cost}.`,
        'success',
        true,
        false
      );
      return true;
    } else {
      SweetAlert2(
        'Transaction Failed',
        `Transaction failed with ${receipt}.`,
        'error',
        true,
        false
      ).then((result: { isConfirmed: boolean }) => {
        if (result.isConfirmed) {
          return false;
        }
      });
    }
  } catch (err: unknown) {
    console.error(err);
    SweetAlert2(
      'Transaction Failed',
      `Something went wrong.`,
      'error',
      true,
      false
    ).then((result: { isConfirmed: boolean }) => {
      if (result.isConfirmed) {
        return false;
      }
    });
  }
};