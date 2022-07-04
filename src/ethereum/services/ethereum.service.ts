import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { ICheckTransaction } from '../interfaces/check-transacion.response';
import { GetContractBalanceDto } from '../dto/get-contract-balance.dto';
import { contractFullAbi, newAbi } from '../contract.abi';
import { GetContractWalletBalanceResponse } from '../interfaces/get-contract-wallet-balance.response';
import { InjectRepository } from '@nestjs/typeorm';
import { EthereumWalletEntity } from '../etities/ethereum-wallet.entity';
import { Repository } from 'typeorm';
import { CreateWalletResponse } from '../interfaces/create-wallet.response';
import { SendTransactionDto } from '../dto/send-transaction.dto';
import { TransactionConfig } from '../interfaces/transaction-config';

const Web3=require("web3")
const Web3HttpProvider = require('web3-providers-http');


@Injectable()
export class EthereumService {
  constructor(@InjectRepository(EthereumWalletEntity) private ethereumWalletRepo:Repository<EthereumWalletEntity>)
  {}

  // infura HTTP MainNet
  MAIN_NET="https://mainnet.infura.io/v3/234caba0709f4b7e82e41e0f8ce608bb"
  // infura WSS MainNet
  WSS_MAIN_NET="wss://mainnet.infura.io/ws/v3/234caba0709f4b7e82e41e0f8ce608bb"
  // infura HTTP TestNet
  ROPSTEN="https://ropsten.infura.io/v3/234caba0709f4b7e82e41e0f8ce608bb"
  // ETH HTTP MainNet
  ETH_MAIN_NET="https://api.etherscan.io/VC7I7BY89GU6N8XK1QDWC4EDARK9V4EQAR"

  public web3 = new Web3(this.ROPSTEN)

  async checkTransaction(hash: string): Promise<ICheckTransaction>
  {
    try {
      const checkTransaction: ICheckTransaction = await this.web3.eth.getTransaction(hash)
      return checkTransaction
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async checkWebProvider(): Promise<any>
  {
    const isProviderSet = await this.web3.setProvider(this.MAIN_NET)
    return isProviderSet
  }

  async createAccount(): Promise<EthereumWalletEntity>
  {
    const createEthAccount:CreateWalletResponse = await this.web3.eth.accounts.create()
    const ethereumWalletEntity=new EthereumWalletEntity()
    ethereumWalletEntity.walletAddress=createEthAccount.address
    ethereumWalletEntity.privateKey=createEthAccount.privateKey
    const save=await this.ethereumWalletRepo.save(ethereumWalletEntity)
    delete save.createdAt
    delete save.id
    return save
  }

  async convertNumberToDecimal(price:number, decimal:number):Promise<number>
  {
    switch (decimal) {
      case 1:
        return price/10
        break;

      case 2:
        return price/100
        break;

      case 3:
        return price/1000
        break;

      case 4:
        return price/10000
        break;

      case 5:
        return price/100000
        break;

      case 6:
        return price/1000000
        break;

      case 7:
        return price/10000000
        break;

      case 8:
        return price/100000000
        break;

      case 9:
        return price/1000000000
        break;

      case 10:
        return price/10000000000
        break;

      case 11:
        return price/100000000000
        break;

      case 12:
        return price/1000000000000
        break;

      case 13:
        return price/10000000000000
        break;

      case 14:
        return price/100000000000000
        break;

      case 15:
        return price/1000000000000000
        break;

      case 16:
        return price/10000000000000000
        break;

      case 17:
        return price/100000000000000000
        break;

      case 18:
        return price/1000000000000000000
        break;
    }
  }

  async convertSendTransactionAmountToDecimal(amount:number,decimal:number):Promise<number>
  {
    switch (decimal) {
      case 1:
        return amount*10
        break;

      case 2:
        return amount*100
        break;

      case 3:
        return amount*1000
        break;

      case 4:
        return amount*10000
        break;

      case 5:
        return amount*100000
        break;

      case 6:
        return amount*1000000
        break;

      case 7:
        return amount*10000000
        break;

      case 8:
        return amount*100000000
        break;

      case 9:
        return amount*1000000000
        break;

      case 10:
        return amount*10000000000
        break;

      case 11:
        return amount*100000000000
        break;

      case 12:
        return amount*1000000000000
        break;

      case 13:
        return amount*10000000000000
        break;

      case 14:
        return amount/100000000000000
        break;

      case 15:
        return amount*1000000000000000
        break;

      case 16:
        return amount*10000000000000000
        break;

      case 17:
        return amount*100000000000000000
        break;

      case 18:
        return amount*1000000000000000000
        break;
    }
  }

  async getWalletBalance(address: string): Promise<any>
  {
    try {
      const checkWalletBalance = await this.web3.eth.getBalance(address)
      const turnCheckWalletBalanceToInt=parseInt(checkWalletBalance)
      const converted=await this.convertNumberToDecimal(turnCheckWalletBalanceToInt,18)
      return   converted

    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async contractWalletBalance(getContractBalanceDto: GetContractBalanceDto): Promise<GetContractWalletBalanceResponse>
  {
    try {
      const contractInstance = await new this.web3.eth.Contract(contractFullAbi, getContractBalanceDto.contractAddress)
      const balance = await contractInstance.methods["balanceOf"](getContractBalanceDto.walletAddress).call()
      const turnBalanceToNumber=parseInt(balance)
      const contractSymbol = await contractInstance.methods["symbol"]().call()
      const contractDecimal=await contractInstance.methods["decimals"]().call()
      const turnDecimalToNumber=parseInt(contractDecimal)

      const getContractWalletBalanceResponse: GetContractWalletBalanceResponse =
        {
          balance: await this.convertNumberToDecimal(turnBalanceToNumber,turnDecimalToNumber),
          symbol: contractSymbol
        }
      return getContractWalletBalanceResponse
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async getGasPrice(): Promise<any>
  {
    const gasPrice = await this.web3.eth.getGasPrice()
    const converted = await this.web3.utils.fromWei(gasPrice, "Gwei")
    return converted /1000000000
  }

  async privateKeyToAccount(privateKey:string)
  {
    const prvToAccount=await this.web3.eth.accounts.privateKeyToAccount(privateKey)
    return prvToAccount
  }

  async sendTransaction():Promise<any>
  {
    let contract = new this.web3.eth.Contract(newAbi, "0x71d82Eb6A5051CfF99582F4CDf2aE9cD402A4882" ,{ from : "0x6E359A6237b9E3c42702d756521f099de2A22fbf" });
    let amountTransfer=100.100
    const decimal= await contract.methods["decimals"]().call()
      const turnDecimalToNumber=parseInt(decimal)
    const finalTransferAmount=await this.convertSendTransactionAmountToDecimal(amountTransfer,turnDecimalToNumber)

    let data = await contract.methods.transfer("0x863A0c21Ca36EC96522fAE4c31d960e4203A0d66", finalTransferAmount)
    console.log(data);
    let count = await  this.web3.eth.getTransactionCount("0x6E359A6237b9E3c42702d756521f099de2A22fbf")
    let block = await this.web3.eth.getBlock("latest");
    let gasLimit = block.gasLimit/block.transactions.length


    let transactionConfig:TransactionConfig = {
      from:"0x6E359A6237b9E3c42702d756521f099de2A22fbf",
      gasPrice:await this.web3.utils.toHex(46 * 1e9),
       gas:await this.web3.utils.toHex(gasLimit.toString().split(".")[0]),
      to:"0x71d82Eb6A5051CfF99582F4CDf2aE9cD402A4882",
      value:"0x0",
      data:data,
      nonce:await this.web3.utils.toHex(count)
    }

    try {
      let createTransaction=await this.web3.eth.accounts.signTransaction( transactionConfig, "565afd8feb280cdf9063fa2f70abbe125ae7069f822eb4ddb44ee81dac6fb694" );
      let result = await this.web3.eth.sendSignedTransaction( createTransaction.rawTransaction  );
    }catch (error) {
      console.log(error);
    }



  }
    sendTransactionDto:SendTransactionDto=
      {
        amount:0.01,
        fromPrivateKey:"36ad8d24cf88c06d3437f8a16c1f58b0da41b6f9e089d56ed81fbfe0950d4d9c",
        txFrom:"0x863A0c21Ca36EC96522fAE4c31d960e4203A0d66",
          txTo:"0x21F23091AA8b6917E9b3a4C8a047b575042FD84a"
      }


}