export const ONCHAIN_VERIFIER = Symbol('IOnchainVerifier');

export interface VerifyTransferResult {
  confirmed: boolean;
  /** amount received in the token's smallest unit (e.g. USDT has 6 decimals) */
  amount: bigint;
  token: string;
}

export interface IOnchainVerifier {
  /**
   * Verifies that a given txHash transferred the expected token
   * to the platform deposit wallet with at least 3 confirmations.
   *
   * @param txHash  - on-chain transaction hash sent by the user
   * @param expectedWallet - platform deposit wallet address
   */
  verifyTransfer(
    txHash: string,
    expectedWallet: string,
  ): Promise<VerifyTransferResult>;
}
