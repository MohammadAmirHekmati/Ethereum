import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EthereumWalletEntity {
  @PrimaryGeneratedColumn("uuid")
  id:string

  @Column()
  walletAddress:string

  @Column()
  privateKey:string


  @CreateDateColumn({type:"timestamptz"})
  createdAt:Date
}