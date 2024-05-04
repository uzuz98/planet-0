import { BNB_TESTNET } from "@/components/adapterModal";
import { ERC20TokenABI } from "@/constants";
import { calculateBigNumber, convertBalanceToWei } from "@/lib/converter";
import Web3, { Contract } from "web3";

export class PlanetService {
  static Instance: PlanetService;
  mnemonic = process.env.NEXT_PUBLIC_DEX_WALLET_MNEMONIC;
  walletAddress = process.env.NEXT_PUBLIC_DEX_WALLET;
  // @ts-expect-error
  client: Web3;

  constructor() {
    if (PlanetService.Instance) return PlanetService.Instance;
    PlanetService.Instance = this;
    this.client = new Web3(
      new Web3.providers.HttpProvider(BNB_TESTNET.rpcUrls[0])
    );
  }

  async getTXTransfer(address: string, amount: number) {
    const contract = new this.client.eth.Contract<typeof ERC20TokenABI>(
      ERC20TokenABI,
      process.env.NEXT_PUBLIC_FOR_CONTRACT
    );

    const data = contract.methods
      .transfer(
        process.env.NEXT_PUBLIC_DEX_WALLET,
        convertBalanceToWei(String(amount), 18)
      )
      .encodeABI();

    const transactionFORToken = {
      from: address!,
      to: process.env.NEXT_PUBLIC_FOR_CONTRACT,
      data: data,
    };

    return transactionFORToken;
  }

  async onMintToken(params: {
    walletAddress: string;
    rawAmount: number;
    contractAddress: string;
  }) {
    const to = params.contractAddress;

    const contract = new this.client.eth.Contract<typeof ERC20TokenABI>(
      ERC20TokenABI,
      to
    );

    const data = contract.methods
      .mint(params.walletAddress, params.rawAmount)
      .encodeABI();
    const gasPrice = await this.client.eth.getGasPrice();

    const transaction: {
      from: string;
      to: string;
      data: string;
      value: string;
      gas?: string;
      gasPrice?: string;
    } = {
      from: process.env.NEXT_PUBLIC_DEX_WALLET!,
      to,
      data: data,
      value: "0x0",
    };
    const gas = await this.client.eth.estimateGas(transaction);

    transaction.gas = String(gas);
    transaction.gasPrice = String(gasPrice);

    const signature = await this.client.eth.accounts.signTransaction(
      transaction,
      process.env.NEXT_PUBLIC_DEX_WALLET_PRIVATE_KEY!
    );

    const txs = await this.client.eth.sendSignedTransaction(
      signature.rawTransaction
    );
    return txs;
  }

  async onGetApproveToken(params: {
    walletAddress: string;
    amount: string;
    receiver: string;
    contractAddress: string;
  }) {
    const contract = new this.client.eth.Contract<typeof ERC20TokenABI>(
      ERC20TokenABI,
      params.contractAddress
    );
    const allowance = await contract.methods
      .allowance(params.walletAddress, params.receiver)
      .call();
    if (
      Number(
        calculateBigNumber([params.amount, String(allowance)], "subtract")
      ) >= 0
    ) {
      const data = contract.methods
        .approve(params.receiver, params.amount)
        .encodeABI();
      const transaction = {
        from: params.walletAddress,
        to: params.contractAddress,
        data: data,
        value: "0x0",
      };
      return transaction;
    }
    return false;
  }

  transferTokenByAnotherAddress = async (params: {
    amount: number;
    contractAddress: string;
    walletAddress: string;
    sender: string;
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
      data: dataTx,
    };
    return transaction;
  };
}

export const planetService = new PlanetService();
