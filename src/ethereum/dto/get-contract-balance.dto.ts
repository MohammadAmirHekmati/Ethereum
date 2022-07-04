import { ApiProperty } from '@nestjs/swagger';

export class GetContractBalanceDto {
  @ApiProperty()
  walletAddress:string

  @ApiProperty()
  contractAddress:string
}