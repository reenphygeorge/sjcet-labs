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
      labTimeTable: {
        include: {
          teachingStaff: true
        }
      }
    }
  })

  if (user !== null) {
    if (!user?.labAdmin && !user?.labIncharge) {
      return user;
    } else if (user?.labAdmin || user?.labIncharge) {
      const labId = user.labId
      if (labId !== null) {
        const labData = await getLabData(labId)

        const newData = {
          ...user,
          labData
        }

        return newData
      }
    } 
    // else if (user?.labIncharge) {
    //   const labId = user.labId
    //   if (labId !== null) {
    //     const labData = getLabData(labId)
    //     const newData = {
    //       ...user,
    //       labData
    //     }

    //     return newData
    //   }
    // }

  }
}

const getLabData = async (labId: string) => {
  const labData = await prisma.lab.findUnique({
    where: {
      id: labId
    },
    include: {
      report: true,
      reservation: true
    }
  })

  return labData
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
