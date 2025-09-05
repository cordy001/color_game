import { defineChain } from "viem";
import setting from '@/app/config/conf/setting.json';

export default function BaseSepolia() {
    const baseSepolia = defineChain({
        id: 84532,
        name: 'Base Sepolia',
        network: 'base-sepolia',
        nativeCurrency: {
            name: 'Base Sepolia Ether',
            symbol: 'ETH',
            decimals: 18,
        },
        rpcUrls: {
            default: {
            http: [
                process.env.NEXT_PUBLIC_LINK_PROJECT_ID_SEPOLIA || setting.PUBLIC_ACCESS.RPC_Endpoint,
            ],
            },
            public: {
            http: [
                process.env.NEXT_PUBLIC_LINK_PROJECT_ID_SEPOLIA || setting.PUBLIC_ACCESS.RPC_Endpoint,
            ],
            },
        },
        blockExplorers: {
            default: { name: 'Basescan', url: 'https://sepolia.basescan.org' },
        },
        testnet: true,
    });

return baseSepolia;


}