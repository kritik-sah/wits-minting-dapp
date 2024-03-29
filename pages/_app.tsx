import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import "../styles/globals.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, sepolia, WagmiConfig } from "wagmi";
import { skaleNebula } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { skaleNebulaTestnetCustom } from "../utils/chainTestnet";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [skaleNebulaTestnetCustom, skaleNebula],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "eth-blast",
  projectId: "19f1c4bd49b1bcedd01449addb543a4f",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
