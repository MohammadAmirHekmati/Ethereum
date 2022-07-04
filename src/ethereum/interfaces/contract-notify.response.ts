
export class ContractNotifyResponse {
  removed:boolean
  logIndex:number
  transactionIndex:number
  transactionHash:string
  blockHash:string
  blockNumber:number
  address:string
  id:string
  returnValues:ReturnValues
  event:string
  signature:string
  raw:Raw
}

class ReturnValues {
  0:string
  1:string
  2:string
  from:string
  to:string
  value:string
}

class Raw {
  data:string
  topics:string[]
}