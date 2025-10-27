export default () => ({
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000') || 3000,
  jwtSecret: process.env.JWT_SECRET || '',
  hashSalt: parseInt(process.env.HASH_SALT || '10') || 10,
  googleId: process.env.GOOGLE_CLIENT_ID || '',
  googleSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  facebookId: process.env.FACEBOOK_CLIENT_ID || '',
  facebookSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
});
