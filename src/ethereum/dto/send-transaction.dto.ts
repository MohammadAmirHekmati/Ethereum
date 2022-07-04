import { ApiProperty } from "@nestjs/swagger";

export class SendTransactionDto {
  @ApiProperty()
  txTo: string;
  @ApiProperty()
  txFrom: string;
  @ApiProperty()
  fromPrivateKey: string;
  @ApiProperty()
  amount: number
}
