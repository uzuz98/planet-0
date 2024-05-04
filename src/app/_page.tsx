"use client";

import { BNB_TESTNET } from "@/components/adapterModal";
import { UNLIMIT_HEX } from "@/constants";
import { ERC20FactoryABI, ERC20TokenABI } from "@/constants/ABI";
import { useWallet } from "@coin98-com/wallet-adapter-react";
import { useWalletModal } from "@coin98-com/wallet-adapter-react-ui";
import Web3, { Transaction } from "web3";

const DEFAULT_AMOUNT = 1000000000

export default function Home() {
  const { connected, address, sendTransaction } = useWallet();
  const { openWalletModal } = useWalletModal();

  const onDeployNewToken = async () => {
    const to = process.env.NEXT_PUBLIC_CONTRACT_FACTORY

    const params = {
      name: "Test Project Name A",
      symbol: "FoTPN A",
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
    const to = process.env.NEXT_PUBLIC_TOKEN_2

    const client = new Web3(
      new Web3.providers.HttpProvider(BNB_TESTNET.rpcUrls[0])
    );
    const contract = new client.eth.Contract<typeof ERC20TokenABI>(
      ERC20TokenABI,
      to
    );
    const data = contract.methods
      .mint(address, DEFAULT_AMOUNT)
      .encodeABI();

    const transaction = {
      from: address!,
      to,
      data: data,
    };
    const result = await sendTransaction(transaction);
    console.log("🩲 🩲 => onMintToken => result:", result);
  };

  const approve = async () => {
    const amountApprove = 300

    const contractAddress = process.env.NEXT_PUBLIC_TOKEN_1

    const receiver = '0x3fffAE020664f9724Af1293d79816d0182288563'

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
    if (Number(allowance) < amountApprove) {
      const data = contract.methods.approve(receiver, amountApprove).encodeABI();
      const transaction: Transaction = {
        from: address!,
        to: contractAddress,
        data: data,
        value: "0x0"
      };
      const result = await sendTransaction(transaction);
      console.log("🩲 🩲 => approve => result:", result)
    }
  };

  const transferTokenByAnotherAddress = async () => {
    const amountApprove = 200
    const contractAddress1 = process.env.NEXT_PUBLIC_TOKEN_1
    // const contractAddress = process.env.NEXT_PUBLIC_TOKEN_2

    const address1 = '0x6e850e52369206cad7f8474253c1054e22e623f3'
    // const receiver1 = '0x3fffAE020664f9724Af1293d79816d0182288563'

    const client = new Web3(
      new Web3.providers.HttpProvider(BNB_TESTNET.rpcUrls[0])
    );
    
    const contract1 = new client.eth.Contract<typeof ERC20TokenABI>(
      ERC20TokenABI,
      contractAddress1
    );
    const allowance = await contract1.methods
      .allowance(address1, address)
      .call();
    console.log("🩲 🩲 => transferTokenByAnotherAddress => allowance:", allowance)

    const checkIsValidTransfer = contract1.methods
      .transferFrom(address1, address, amountApprove)
      .encodeABI();

    const transactionCheckValidTransfer: Transaction = {
      from: address!,
      to: contractAddress1,
      data: checkIsValidTransfer
    };
    const resultValidTransfer = await sendTransaction(
      transactionCheckValidTransfer
    );

  }

  const onPress = () => {
    // onDeployNewToken()
    // onMintToken()
    // approve();
    transferTokenByAnotherAddress()
  };

  const onConnect = async () => {
    if (!connected) {
      console.log("🚀 ~ onConnect ~ openWalletModal:", openWalletModal);
      openWalletModal();
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <button onClick={onPress}>Mint nft</button>
        <p onClick={onConnect}>{address || "no wallet"}</p>
      </div>
    </main>
  );
}
