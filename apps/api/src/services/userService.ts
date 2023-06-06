/* eslint-disable import/no-extraneous-dependencies */
import { PrismaClient } from '@prisma/client';
import { PatchUserData } from '../helpers/types/user';

const prisma = new PrismaClient();

const getUserService = async (authId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      authId
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

const patchUserData = async ({authId, registerNumber, name, departmentId, email, phoneNumber}: PatchUserData) => {
  await prisma.user.update({
    data: {
      registerNumber,
      name,
      departmentId,
      email,
      phoneNumber
    },
    where: {
      authId
    }
  })
}

export { getUserService, patchUserData };
