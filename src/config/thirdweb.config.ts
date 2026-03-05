import { registerAs } from '@nestjs/config';

export default registerAs('thirdweb', () => ({
  clientId: process.env.THIRDWEB_CLIENT_ID,
  adminPrivateKey: process.env.THIRDWEB_ADMIN_PRIVATE_KEY,
  authDomain: process.env.THIRDWEB_AUTH_DOMAIN,
  secretKey: process.env.THIRDWEB_SECRET_KEY,
}));
