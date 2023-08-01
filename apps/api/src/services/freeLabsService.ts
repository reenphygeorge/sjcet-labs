import { PrismaClient } from '@prisma/client';
import { FreeLabResponseInfo, LabReservationInfo } from '../helpers/types/user';

const prisma = new PrismaClient();

const getFreeLabsInfo = async (labId: string) => {
  // Getting the details of the labs that are free during the specified day and periods
  const labData = await prisma.lab.findUnique({
    select: {
      labName: true,
      reservation: {
        include: {
          professor: {
            select: {
              registerNumber: true,
              name: true,
              phoneNumber: true,
            },
          },
          teachingDepartment: {
            select: {
              name: true,
            },
          },
        },
        where: {
          status: 'APPROVED',
        },
      },
      timeTable: {
        select: {
          periodNumber: true,
          dayId: true,
        },
        orderBy: {
          day: {
            dayNumber: 'asc',
          },
        },
      },
    },
    where: {
      id: labId,
    },
  });

  if (labData === null) {
    return null;
  }

  const labReservationInfo: LabReservationInfo[] = [];

  labData.reservation.forEach((reservation) => {
    reservation.periods.forEach((period) => {
      const departmentWithBatch = `${reservation.teachingDepartment.name}-${reservation.batch}`;
      const newReservation: LabReservationInfo = {
        id: reservation.id,
        dayId: reservation.dayId,
        periodNumber: period,
        staffName: reservation.professor.name,
        departmentWithBatch,
        semester: reservation.semester,
        purpose: reservation.purpose,
        negotiable: reservation.negotiable,
        phoneNumber: reservation.professor.phoneNumber,
      };
      labReservationInfo.push(newReservation);
    });
  });

  const data: FreeLabResponseInfo = {
    id: labId,
    labName: labData.labName,
    labReservationInfo,
  };

  if (labData === null) {
    return null;
  }

  return data;
};

export { getFreeLabsInfo };
