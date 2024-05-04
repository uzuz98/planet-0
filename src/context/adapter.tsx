// Configure blockchains, wallets then wrap app with WalletProvider, WalletModalProvider
"use client";

import {
  BLOCKCHAINS_DATA,
  WalletProvider,
  CHAINS_ID
} from "@coin98-com/wallet-adapter-react";
import { WalletModalProvider } from "@coin98-com/wallet-adapter-react-ui";
// @ts-expect-error
import { Coin98WalletAdapter } from "@coin98-com/wallet-adapter-coin98";

interface ContainerProps {
  children: React.ReactNode;
}

const Coin98AdapterProvider: React.FC<ContainerProps> = ({ children }) => {
  const enables = [CHAINS_ID.binanceSmartTest];
  const wallets = [Coin98WalletAdapter];
  return (
    <WalletProvider wallets={wallets} enables={enables} autoConnect>
      <WalletModalProvider>{children}</WalletModalProvider>
    </WalletProvider>
  );
};

export default Coin98AdapterProvider;