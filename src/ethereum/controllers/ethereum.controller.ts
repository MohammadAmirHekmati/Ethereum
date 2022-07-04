import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { EthereumService } from '../services/ethereum.service';
import { GetContractBalanceDto } from '../dto/get-contract-balance.dto';
import { SendTransactionDto } from '../dto/send-transaction.dto';

@Controller("ethereum")
export class EthereumController {
  constructor(private ethereumService:EthereumService) {
  }

  @Get("check/transaction")
  async checkTransaction(@Query("hash") hash:string):Promise<any>
  {
    return await this.ethereumService.checkTransaction(hash)
  }

  @Get("check/provider")
  async checkWebProvider():Promise<any>
  {
    return await this.ethereumService.checkWebProvider()
  }

  @Get("generate/account")
  async createAccount():Promise<any>
  {
    return await this.ethereumService.createAccount()
  }

  @Get("wallet/balance")
  async getWalletBalance(@Query("address") address:string):Promise<any>
  {
    return await this.ethereumService.getWalletBalance(address)
  }

  @Post("contract/balance")
  async contractWalletBalance(@Body() getContractBalanceDto:GetContractBalanceDto):Promise<any>
  {
    return await this.ethereumService.contractWalletBalance(getContractBalanceDto)
  }

  @Get("gas/fee")
  async getGasPrice():Promise<any>
  {
    return await this.ethereumService.getGasPrice()
  }

  @Post("send/transaction")
  async sendTransaction():Promise<any>
  {
    return await this.ethereumService.sendTransaction()
  }
}