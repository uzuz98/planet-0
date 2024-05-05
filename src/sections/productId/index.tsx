"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Product } from "@/types";
import Image from "next/image";
import { ClientRouting } from "@/constants/routing";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { WalletService } from "@/services";
import { useWallet } from "@coin98-com/wallet-adapter-react";
import { convertBalanceToWei } from "@/lib/converter";
import { PlanetService } from "@/services/planet";
import Web3 from "web3";
import { ERC20TokenABI } from "@/constants/ABI";
import { useToast } from "@/components/ui/use-toast";

export const Wrapper = (props: { product: Product }) => {
  const [forToken, setFORToken] = useState("0");
  const { address, sendTransaction, connected } = useWallet();
  const { product } = props;
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [totalProduct, setProductToken] = useState<
    {
      balance: string;
      rawBalance: string;
    } & Product
  >();

  const { toast } = useToast();

  const onChangeInput = (e: any) => {
    setValue(e.target.value);
  };

  const refetchToken = async () => {
    if (address) {
      const balanceData = await WalletService.Instance.updateWalletAddress(
        address
      ).getFORBalance();
      const totalToken = await WalletService.Instance.getTokenBalance([
        product,
      ]);

      if (totalToken && totalToken[0]) {
        setProductToken(totalToken[0]);
      }

      setFORToken(balanceData.balance);
    }
  };

  useEffect(() => {
    refetchToken();
  }, [address]);

  const checkValidFOR = useMemo(() => {
    const forTokenNumber = Number(forToken);
    return Number(value) < forTokenNumber && forTokenNumber > 0;
  }, [value, forToken]);
  const onMintToken = async () => {
    setIsLoading(true);
    try {
      if (address) {
        const tx = await PlanetService.Instance.getTXTransfer(
          address,
          Number(value)
        );
        const txs = await sendTransaction(tx);

        if (txs.error) {
          throw new Error(txs.error);
        }

        await PlanetService.Instance.onMintToken({
          walletAddress: address,
          rawAmount: convertBalanceToWei(value, Number(product.decimal)),
          contractAddress: product.contractAddress,
        });
        toast({
          title: "Sucess To Buy FOR Token",
          className: "text-green-500",
        });
        refetchToken();
      }
    } catch (error) {
      toast({
        title: "Failed To Buy FOR Token",
        className: "text-red-500",
      });
    }
    setIsLoading(false);
  };

  const shouldDisableButton = useMemo(() => {
    return isLoading || checkValidFOR || !connected;
  }, [isLoading, checkValidFOR, connected]);

  return (
    <div className="pt-24">
      <p className="font-bold text-base mb-4">Product Detail</p>
      <div className="flex flex-col gap-y-4 md:flex-row justify-around w-full gap-x-4">
        <div className="leftItem flex flex-col flex-2 gap-y-2">
          {/* <div className="w-full bg-[#D0D0D0] h-[1px] mb-2"></div> */}
          <div className="bg-[#D9F4D53D] p-4 rounded-2xl">
            <div className="grid bg-white grid-cols-2 gap-x-4 mb-4 p-4 rounded-2xl">
              <div className="">
                <Image
                  src={`${ClientRouting.imageURL}/bg.png`}
                  alt="logo"
                  width={324}
                  height={174}
                />
              </div>
              <div>
                <p className="text-bold text-xl">{product.name}</p>
                <p className="text-[#333333] opacity-[80%]">
                  Total {product.symbol} available: {totalProduct?.balance}{" "}
                  {product.symbol}
                </p>
              </div>
            </div>
            <div className="bg-[#EEF7FF80] text-[#597E52] rounded-2xl p-4">
              <p className="mb-8">Estimate Reward</p>
              <p className="mb-2">Profit sharing Estimate: 10%</p>
              <p>Carbon Credit earn value estimate: 100 $FOR </p>
            </div>
          </div>
          <div className="bg-[#D9F4D53D] p-4 rounded-2xl text-[#333333]">
            <p className="mb-2 text-xl font-bold">{product.name}</p>
            <p>{product.description}</p>
          </div>
        </div>
        <div className="flex-1 md:w-[300px]">
          <div className="bg-[#D9F4D53D] p-4 pb-8 rounded-2xl">
            <div className="flex justify-between items-center">
              <p className="text-[#333333] mb-1 font-bold text-xl opacity-[80%]">
                Amount
              </p>
              <p>{forToken} FOR</p>
            </div>
            <div>
              <input
                onChange={onChangeInput}
                className="bg-white outline-none rounded-xl p-2 w-full focus-visible:border-0 focus-visible:border-none"
              />
            </div>
            <div className="mt-2 flex flex-end">
              <Button
                className="hover:text-black border-2 mt-2 rounded-full py-1 px-4 w-full text-white text-base font-bold"
                onClick={onMintToken}
                disabled={shouldDisableButton}
              >
                {isLoading && <Loader2 className="w-4 animate-spin" />}
                BUY
              </Button>
            </div>
          </div>
          <div className="bg-[#D9F4D53D] p-4 pb-8 mt-2 rounded-2xl">
            <p className="font-bold text-[#333333]">Receive</p>
            <div className="mt-2 grid grid-cols-2 text-[#333333]">
              <p className="opacity-[50%]">Total:</p>
              <p className="text-right">
                {value || 0} ${product.symbol}
              </p>
              <p className="mt-2 opacity-[50%]">Services fee:</p>
              <p className="text-right">7%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
