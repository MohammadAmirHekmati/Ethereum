import { Module } from '@nestjs/common';
import { EthereumModule } from './ethereum/ethereum.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [EthereumModule, DatabaseModule]
})
export class AppModule {}
