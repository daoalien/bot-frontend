"use client";

import * as React from "react";
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import {
  goerli,
  arbitrumGoerli,
  optimismGoerli,
  polygonMumbai,
  bscTestnet,
  avalancheFuji,
} from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    goerli,
    arbitrumGoerli,
    optimismGoerli,
    polygonMumbai,
    bscTestnet,
    avalancheFuji,
  ],
  [publicProvider()]
);

const walletProjectId = process.env.NEXT_PUBLIC_PROJECT_ID;

const projectId = walletProjectId;

const { wallets } = getDefaultWallets({
  appName: "LayerSync",
  projectId,
  chains,
});

const demoAppInfo = {
  appName: "LayerSync",
};

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: "Other",
    wallets: [],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export function Providers({ children }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        showRecentTransactions={true}
        chains={chains}
        appInfo={demoAppInfo}
        theme={darkTheme({
          accentColor: "#45f882",
          accentColorForeground: "black",
          overlayBlur: "small",
        })}
      >
        {mounted && children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
