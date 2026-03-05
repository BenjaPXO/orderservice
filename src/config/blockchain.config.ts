import { registerAs } from '@nestjs/config';

export default registerAs('blockchain', () => ({
  forceMainnet: process.env.FORCE_POLYGON_MAINNET === 'true',
  pxoTokenAddress: process.env.PXO_TOKEN_CONTRACT_ADDRESS,
  treasuryWalletAddress: process.env.PXO_TREASURY_WALLET_ADDRESS,
  encrypterPrivateKey: process.env.ENCRYPTER_PRIVATE_KEY,
  walletPrivateKeyEncrypted: process.env.WALLET_PRIVATE_KEY_ENCRYPTED,
  walletPrivateKey: process.env.WALLET_PRIVATE_KEY, // solo dev
}));
