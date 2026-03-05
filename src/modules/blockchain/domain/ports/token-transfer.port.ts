export const TOKEN_TRANSFER_SERVICE = Symbol('ITokenTransferService');

export interface TransferResult {
  txHash: string;
  success: boolean;
}

export interface ITokenTransferService {
  sendPxoToUser(toAddress: string, amount: number): Promise<TransferResult>;
  subsidizeGas(walletAddress: string): Promise<TransferResult>;
}
