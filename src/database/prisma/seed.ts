import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import bcrypt from 'bcrypt';

async function main() {
  const salt = 10;
  const hashPassword = bcrypt.hashSync('12345678', salt);
  await prisma.user.upsert({
    where: { id: 1 },
    create: {
      email: 'admin',
      password: hashPassword,
      createdBy: 1,
    },
    update: {},
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
