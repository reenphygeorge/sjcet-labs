/* eslint-disable import/no-extraneous-dependencies */
import { PrismaClient } from '@prisma/client';
import logger from '../helpers/logger/logger.init';
import { PatchUserData } from '../helpers/types/user';

const prisma = new PrismaClient();

// const getUserService = async () => {
  // Get data from prisma with prisma queries
//   const data = {
//     data: [
//       {
//         id: '001',
//         name: 'Kishore Sebastian',
//       },
//       {
//         id: '002',
//         name: 'Sarju S',
//       },
//     ],
//   };
//   return data;
// };

const getUserService = async (id: string) => {
  // Get data from prisma with prisma queries
  const user = await prisma.user.findUnique({
    where: {
      authId: id
    },
    include: {
      timeTable: true,
      reservation: true,
      notifications: true,
      report: true,
    }
  })
  return user;
}

const patchUserData = async (updates: PatchUserData) => {
  await prisma.user.update({
    data: {
      registerNumber: updates.registerNumber,
      name: updates.name,
      departmentId: updates.departmentId,
      email: updates.email,
      phoneNumber: updates.phoneNumber
    },
    where: {
      authId: updates.authId
    }
  })
}

export { getUserService, patchUserData };
