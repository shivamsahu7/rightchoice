import { jwt } from '@elysiajs/jwt';

// Initialize a standalone signer
const authJwt = jwt({
  name: 'jwt',
  secret: process.env.JWT_SECRET || 'your-secret-key',
  exp: '7d'
});

export const generateAccessToken = async (payload: { userId: number; email: string; role?: string }) => {
  // Accessing the internal signer provided by Elysia's JWT plugin
  return await authJwt.signer.sign(payload);
};