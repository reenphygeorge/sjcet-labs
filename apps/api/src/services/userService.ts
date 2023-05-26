/* eslint-disable import/no-extraneous-dependencies */
import { PrismaClient } from '@prisma/client';
import logger from '../helpers/logger/logger.init';

const prisma = new PrismaClient();

const getUserService = async () => {
  // Get data from prisma with prisma queries
  const data = {
    data: [
      {
        id: '001',
        name: 'Kishore Sebastian',
      },
      {
        id: '002',
        name: 'Sarju S',
      },
    ],
  };
  return data;
};

getUserService()
  .then(async () => {
    await prisma.$disconnect();
  })

  .catch(async (error: Error) => {
    logger.error(error);

    await prisma.$disconnect();

    process.exit(1);
  });

export { getUserService };
