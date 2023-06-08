/* eslint-disable import/no-extraneous-dependencies */
import { PrismaClient } from '@prisma/client';
import { PatchUserData } from '../helpers/types/user';

const prisma = new PrismaClient();

const getUserService = async (authId: string) => {
  const userTemp = await prisma.user.findUnique({
    where: {
      authId
    }
  })

  if (!userTemp?.labAdmin && !userTemp?.labIncharge) {
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
  } else if (userTemp?.labAdmin) {
    const labId = userTemp?.labId
    if (labId !== null) {
      const labData = await prisma.lab.findUnique({
        where: {
          id: labId
        },
        include: {
          report: true,
          reservation: true
        }
      })

      const labTimeTable = await prisma
    }
  }

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
