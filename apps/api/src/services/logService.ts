import { PrismaClient } from '@prisma/client';
import { LogData } from '../helpers/types/user';

const prisma = new PrismaClient();

const getLogs = async ({ date, labId, periods }: LogData) => {
  const data = await prisma.attendanceRecord.findUnique({
    where: {
      date_labId_periods: {
        date,
        labId,
        periods,
      },
    },
    include: {
      teachingStaff: {
        select: {
          registerNumber: true,
          name: true,
        },
      },
      studentPositions: {
        select: {
          studentId: true,
          systemNumber: true,
          student: {
            select: {
              name: true,
            },
          },
        },
      },
      absentStudents: {
        select: {
          studentId: true,
          student: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  return data;
};

export { getLogs };
