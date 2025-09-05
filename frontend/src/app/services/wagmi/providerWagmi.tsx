
import { ReactNode } from 'react';
import {
  getDefaultConfig,
  RainbowKitProvider,
  darkTheme, lightTheme
} from '@rainbow-me/rainbowkit';
import setting from '@/app/config/conf/setting.json';

import { WagmiConfig } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@rainbow-me/rainbowkit/styles.css';

import { BaseSepolia } from './chains';


const config = getDefaultConfig({
  appName: 'Test Wallet App',
  projectId: setting.wallet__connect_PRID.Wallet__Connect || process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "",
  chains: [BaseSepolia()]
});

const queryClient = new QueryClient();

export default function WalletProviders({ children }: { children: ReactNode }) {
  return (
    <WagmiConfig config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={{
          lightMode: lightTheme({
            overlayBlur: 'small'
          }),
          darkMode: darkTheme({
            overlayBlur: 'small'
          }),
        }}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiConfig>
  );
}