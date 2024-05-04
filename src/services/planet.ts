import { BNB_TESTNET } from "@/components/adapterModal"
import { ERC20TokenABI } from "@/constants"
import { calculateBigNumber } from "@/lib/converter"
import Web3, {Contract} from "web3"

export class PlanetService {
  static Instance: PlanetService
  mnemonic = process.env.NEXT_PUBLIC_DEX_WALLET_MNEMONIC
  walletAddress = process.env.NEXT_PUBLIC_DEX_WALLET
  // @ts-expect-error
  client: Web3

  constructor () {
    if(PlanetService.Instance) return PlanetService.Instance
    PlanetService.Instance = this
    this.client = new Web3(
      new Web3.providers.HttpProvider(BNB_TESTNET.rpcUrls[0])
    );
  }

  async onGetMintToken (params: {
    walletAddress: string
    name: string
    symbol: string
    decimal: string
    rawAmount: number
  }) {
    const to = process.env.NEXT_PUBLIC_TOKEN_2

    const contract = new this.client.eth.Contract<typeof ERC20TokenABI>(
      ERC20TokenABI,
      to
    );

    const data = contract.methods
      .mint(params.walletAddress, params.rawAmount)
      .encodeABI();

    const transaction = {
      from: params.walletAddress!,
      to,
      data: data,
    };
    return transaction
  }

  async onGetApproveToken (params: {
    walletAddress: string
    amount: string
    receiver: string
    contractAddress: string
  }) {
    const contract = new this.client.eth.Contract<typeof ERC20TokenABI>(
      ERC20TokenABI,
      params.contractAddress
    );
    const allowance = await contract.methods
      .allowance(params.walletAddress, params.receiver)
      .call()
    if (
      Number(calculateBigNumber([params.amount, String(allowance)], 'subtract')) >= 0
    ) {
      const data = contract.methods.approve(params.receiver, params.amount).encodeABI();
      const transaction = {
        from: params.walletAddress,
        to: params.contractAddress,
        data: data,
        value: "0x0"
      }
      return transaction
    }
    return false
  }

  transferTokenByAnotherAddress = async (params: {
    amount: number
    contractAddress: string
    walletAddress: string
    sender: string
  }) => {
    const client = new Web3(
      new Web3.providers.HttpProvider(BNB_TESTNET.rpcUrls[0])
    );
    
    const contract = new client.eth.Contract<typeof ERC20TokenABI>(
      ERC20TokenABI,
      params.contractAddress
    );

    const dataTx = contract.methods
      .transferFrom(params.sender, params.walletAddress, params.amount)
      .encodeABI();

    const transaction = {
      from: params.walletAddress!,
      to: params.contractAddress,
      data: dataTx
    };
    return transaction
  }
}