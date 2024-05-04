'use client'

import { BNB_TESTNET } from "@/components/adapterModal";
import { ERC20FactoryABI, ERC20TokenABI } from "@/constants/ABI";
import { useWallet } from "@coin98-com/wallet-adapter-react";
import { useWalletModal } from "@coin98-com/wallet-adapter-react-ui";
import Web3 from 'web3'

export default function Home() {
  const {connected, address, sendTransaction}= useWallet()
  const { openWalletModal } = useWalletModal();

  const onDeployNewToken = async () => {
    const to = '0x095c7670D1aFF76F350ece3F12C91cDc6362b473'

    const params = {
      name: 'Test Project Name',
      symbol: 'FoTPN',
      decimals: '18',
      initialSupply: 100000000000
    }

    const client = new Web3(new Web3.providers.HttpProvider(BNB_TESTNET.rpcUrls[0]))
    const contract = new client.eth.Contract<typeof ERC20FactoryABI>(ERC20FactoryABI, to)
    
    const data = contract.methods.deployNewERC20Token(params.name, params.symbol, params.decimals, params.initialSupply).encodeABI()

    const transaction = {
      from: address!,
      to,
      data: data,
      value: '0x'
    }
    
    const result = await sendTransaction(transaction)
    console.log("🩲 🩲 => onDeployNewToken => result:", result)
  }

  const onMintToken = async () => {
    const to = '0x7c77F495f279EdD98B4a132ef363c6F2F4a3a16e'
    const client = new Web3(new Web3.providers.HttpProvider(BNB_TESTNET.rpcUrls[0]))
    const contract = new client.eth.Contract<typeof ERC20TokenABI>(ERC20TokenABI, to)
    const data = contract.methods.transfer('0x6e850e52369206CAd7f8474253c1054E22E623F3', 10000000).encodeABI()
    
    const transaction = {
      from: address!,
      to,
      data: data,
      value: '0x0'
    }
    const result = await sendTransaction(
      transaction
    )
    console.log("🩲 🩲 => onMintToken => result:", result)
  }

  const onPress = () => {
    // onDeployNewToken()
    onMintToken()
  }

  const onConnect = async () => {
    if(!connected) {
      openWalletModal()
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <button onClick={onPress}>
          Mint nft
        </button>
        <p onClick={onConnect}>{address || 'no wallet'}</p>
      </div>
    </main>
  );
}
