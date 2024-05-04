import { BNB_TESTNET } from '@/components/adapterModal'
import { ERC20FactoryABI, ERC20TokenABI } from '@/constants'
import { convertWeiToBalance } from '@/lib/converter'
import { Product } from '@/types'
import Web3, { Contract } from 'web3'

export class WalletService {
  static Instance: WalletService
  static DECIMAL = 18
  address?: string
  client?: Web3
  contractCached = new Map<string, Contract<typeof ERC20TokenABI>>()

  constructor (address: string) {
    if(WalletService.Instance) {
      return WalletService.Instance
    }
    WalletService.Instance = this
    this.address = address
    this.client = new Web3(
      new Web3.providers.HttpProvider(BNB_TESTNET.rpcUrls[0])
    );
  }

  async getBalance(): Promise<{
    rawBalance: string
    balance: string
  }> {
    try {
      if(this.address) {
        const rawBalance = await this.client?.eth.getBalance(this.address)
        const balance = convertWeiToBalance(String(rawBalance), WalletService.DECIMAL)
        return {
          rawBalance: String(rawBalance),
          balance
        }
      }
    } catch (error) {}
    return {
      rawBalance: '0',
      balance: '0'
    }
  }

  changeWallet(address: string): WalletService {
    this.address = address
    return this
  }

  async getTokenBalance (products: Product[]): Promise<({
    balance: string
    rawBalance: string
  } & Product)[]> {
    const allProduct = await Promise.all(
      products.map(
        async product => {
          try {
            const contract = await this.getContract(product.contractAddress)
  
            const rawBalance = await contract?.methods.balanceOf(this.address).call()
            const balance = convertWeiToBalance(String(rawBalance), product.decimal)
  
            return {
              balance: String(balance),
              rawBalance: String(rawBalance),
              ...product
            }
          } catch (error) {}
          return {
            balance: '0',
            rawBalance: '0',
            ...product
          }
        }
      )
    )

    return allProduct
  }

  async getContract (address: string) {
    const hasContract = this.contractCached.has(address)
    if(hasContract) {
      return this.contractCached.get(address)
    }
    const contract = new this.client!.eth.Contract<typeof ERC20TokenABI>(ERC20TokenABI, address)
    this.contractCached.set(address, contract)
    return contract
  }
}