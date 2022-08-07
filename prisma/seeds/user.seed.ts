import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

export const user = async () => {
  const prisma = new PrismaClient();

  const user1 = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      email: 'admin@ceres.com',
      firstName: 'Admin',
      lastName: 'Admin',
      password: await hash('Hello101!', 12),
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const user2 = await prisma.user.upsert({
    where: { username: 'user' },
    update: {},
    create: {
      username: 'user',
      email: 'user@ceres.com',
      firstName: 'User',
      lastName: 'User',
      password: await hash('Hello101!', 12),
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  return { user1, user2 };
};
