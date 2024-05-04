"use client";
import { WalletService } from "@/services";
import { useWallet } from "@coin98-com/wallet-adapter-react";
import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type GlobalStateValue = {
  balance: string;
};

const GlobalStateContext = createContext<GlobalStateValue>({
  balance: "0",
});

export const useGlobalStateContext = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error(
      "useGlobalStateContext should be used in side GlobalStateProvider"
    );
  }
  return context;
};
export const useBallance = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error(
      "useGlobalStateContext should be used in side GlobalStateProvider"
    );
  }
  return context.balance;
};

const GlobalStateProvider: FC<PropsWithChildren> = ({ children }) => {
  const [balance, setBallance] = useState("0");
  const { address, connected } = useWallet();

  const getBallance = async () => {
    if (address) {
      const wallet = new WalletService();
      const balanceData = await wallet
        .updateWalletAddress(address)
        .getBalance();
      setBallance(balanceData.balance);
    }
  };

  useEffect(() => {
    getBallance();
  }, [address, connected]);
  return (
    <GlobalStateContext.Provider value={{ balance }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export default GlobalStateProvider;
