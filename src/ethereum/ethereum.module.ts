import { Module } from '@nestjs/common';
import { EthereumController } from './controllers/ethereum.controller';
import { EthereumService } from './services/ethereum.service';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EthereumWalletEntity } from './etities/ethereum-wallet.entity';

@Module({
  imports:[
    ScheduleModule.forRoot(),
  TypeOrmModule.forFeature([EthereumWalletEntity])
  ],
  controllers:[EthereumController],
  providers:[EthereumService]
})
export class EthereumModule {}
