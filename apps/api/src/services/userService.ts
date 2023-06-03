/* eslint-disable import/no-extraneous-dependencies */
import { PrismaClient } from '@prisma/client';
import logger from '../helpers/logger/logger.init';

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
  if (id === 'hello') {
    const data = {
      id: 'asjdna2133',
      name: 'Kishore Sebastian'
    }
    console.log(data)
    return data
  } else {
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
    // const data = {
    //   id: professor?.id,
    //   name: professor?.name
    // }
    return user;
  }
};

// const postUserData = async (name: string, batches: number) => {
//   const professor = await prisma.departments.create({
//     data: {
//       name: name,
//       batches: batches

//     }
//   })
//   console.log(professor)
// }
// getUserService(id)
//   .then(async () => {
//     await prisma.$disconnect();
//   })

//   .catch(async (error: Error) => {
//     logger.error(error);

//     await prisma.$disconnect();

//     process.exit(1);
//   });

export { getUserService };
