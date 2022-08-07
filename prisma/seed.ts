import { PrismaClient } from '@prisma/client';
import { user } from './seeds/user.seed';

const prisma = new PrismaClient();

async function main() {
  await user();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
