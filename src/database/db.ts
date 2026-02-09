import 'dotenv/config'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import { PrismaClient } from './generated/prisma'


const adapter = new PrismaMariaDb({
  host: process.env.DB_HOST!,
  port: Number(process.env.DB_PORT || 3306),
  connectionLimit: Number(process.env.DB_CONN_LIMIT || 5),
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!,
});

export const prisma = new PrismaClient({ adapter })