"use client";

import { BNB_TESTNET } from "@/components/adapterModal";
import { UNLIMIT_HEX } from "@/constants";
import { ERC20FactoryABI, ERC20TokenABI } from "@/constants/ABI";
import { useWallet } from "@coin98-com/wallet-adapter-react";
import { useWalletModal } from "@coin98-com/wallet-adapter-react-ui";
import Web3, { Transaction } from "web3";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import HeroSection from "@/sections/HeroSection";

export default function Home() {
  const { connected, address, sendTransaction } = useWallet();
  const { openWalletModal } = useWalletModal();

  const onDeployNewToken = async () => {
    const to = "0x095c7670D1aFF76F350ece3F12C91cDc6362b473";

    const params = {
      name: "Test Project Name B",
      symbol: "FoTPN",
      decimals: "18",
      initialSupply: 100000000000,
    };

    const client = new Web3(
      new Web3.providers.HttpProvider(BNB_TESTNET.rpcUrls[0])
    );
    const contract = new client.eth.Contract<typeof ERC20FactoryABI>(
      ERC20FactoryABI,
      to
    );

    const data = contract.methods
      .deployNewERC20Token(
        params.name,
        params.symbol,
        params.decimals,
        params.initialSupply
      )
      .encodeABI();

    const transaction = {
      from: address!,
      to,
      data: data,
      value: "0x",
    };

    const result = await sendTransaction(transaction);
    console.log("🩲 🩲 => onDeployNewToken => result:", result);
  };

  const onMintToken = async () => {
    const to = "0x7c77F495f279EdD98B4a132ef363c6F2F4a3a16e";
    const client = new Web3(
      new Web3.providers.HttpProvider(BNB_TESTNET.rpcUrls[0])
    );
    const contract = new client.eth.Contract<typeof ERC20TokenABI>(
      ERC20TokenABI,
      to
    );
    const data = contract.methods
      .transfer("0x6e850e52369206CAd7f8474253c1054E22E623F3", 10000000)
      .encodeABI();

    const transaction = {
      from: address!,
      to,
      data: data,
      value: "0x0",
    };
    const result = await sendTransaction(transaction);
    console.log("🩲 🩲 => onMintToken => result:", result);
  };

  const approve = async () => {
    const contractAddress = "0x7c77F495f279EdD98B4a132ef363c6F2F4a3a16e";

    const to = "0xd292e1316FE04AB997d345c6ad426Eb3426Fc3C6";
    // const spender = "0x6e850e52369206CAd7f8474253c1054E22E623F3";
    // const spender = '0x7c77F495f279EdD98B4a132ef363c6F2F4a3a16e'

    const receiver = "0x6e850e52369206CAd7f8474253c1054E22E623F3";

    const client = new Web3(
      new Web3.providers.HttpProvider(BNB_TESTNET.rpcUrls[0])
    );

    const contract = new client.eth.Contract<typeof ERC20TokenABI>(
      ERC20TokenABI,
      contractAddress
    );
    // const balance = await contract.methods.balanceOf(address).call()
    // console.log("🚀 ~ approve ~ balance:", balance)

    const allowance = await contract.methods
      .allowance(address, receiver)
      .call();
    console.log("🚀 ~ approve ~ allowance:", Number(allowance));
    if (Number(allowance) < 300) {
      const data = contract.methods.approve(receiver, UNLIMIT_HEX).encodeABI();
      const transaction: Transaction = {
        from: address!,
        to,
        data: data,
        value: "0x0",
      };
      console.log("🚀 ~ approve ~ transaction:", transaction);
      const result = await sendTransaction(transaction);
      console.log("🚀 ~ approve ~ result:", result);
    }

    const checkIsValidTransfer = contract.methods
      .transferFrom(address, receiver, 300)
      .encodeABI();

    const transactionCheckValidTransfer: Transaction = {
      from: address!,
      to: contractAddress,
      data: checkIsValidTransfer,
    };
    const resultValidTransfer = await sendTransaction(
      transactionCheckValidTransfer
    );

    console.log("🚀 ~ approve ~ resultValidTransfer:", resultValidTransfer);
    console.log("🚀 ~ approve ~ checkIsValidTransfer:", checkIsValidTransfer);
  };
  const onPress = () => {
    // onDeployNewToken()
    // onMintToken()
    onDeployNewToken();
    // approve();
  };

  const onConnect = async () => {
    if (!connected) {
      console.log("🚀 ~ onConnect ~ openWalletModal:", openWalletModal);
      openWalletModal();
    }
  };

  return (
    <div className="w-full max-w-5xl items-center justify-between text-sm lg:flex">
      <button onClick={onPress}>Mint nft</button>
      <p onClick={onConnect}>{address || "no wallet"}</p>
      <HeroSection />
    </div>
  );
}
