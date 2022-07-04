 export interface ICheckTransaction {
    hash: string;
    accessList: any[];
    blockHash: string;
    blockNumber: number;
    chainId: string;
    from: string;
    gas: number;
    gasPrice: string;
    input: string;
    maxFeePerGas: string;
    maxPriorityFeePerGas: string;
    nonce: number;
    r: string;
    s: string;
    to?: any;
    transactionIndex: number;
    type: number;
    v: string;
    value: string;
  }