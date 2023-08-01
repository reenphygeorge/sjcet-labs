import { NotificationType, PrismaClient } from '@prisma/client';
import { ConflictingPeriods, ReservationInfo, ReviewInfo } from '../helpers/types/user';

const prisma = new PrismaClient();

const reservationCreate = async (reservationInfo: ReservationInfo) => {
  const labTimeTableInfo = await prisma.labTimeTable.findMany({
    select: {
      dayId: true,
      periodNumber: true,
    },
    where: {
      labId: reservationInfo.labId,
    },
  });

  const conflictingPeriods: ConflictingPeriods[] = [];
  let flag = false;

  reservationInfo.periods.forEach((periodNumber) => {
    labTimeTableInfo.forEach((timeTable) => {
      if (reservationInfo.dayId === timeTable.dayId) {
        if (periodNumber === timeTable.periodNumber) {
          flag = true;
          conflictingPeriods.push({
            status: 'CONFLICTING',
            dayId: reservationInfo.dayId,
            periodNumber,
          });
        }
      }
    });
  });

  if (flag) {
    return conflictingPeriods;
  }

  conflictingPeriods.push({
    status: 'SUCCESSFUL',
    dayId: null,
    periodNumber: null,
  });

  await prisma.reservation.create({
    data: reservationInfo,
  });

  // Creating Notifications for the lab administrators
  const labAdmins = await prisma.lab.findUnique({
    where: {
      id: reservationInfo.labId,
    },
    select: {
      labAdmins: true,
    },
  });

  if (labAdmins !== null) {
    const notificationData: any = [];
    labAdmins.labAdmins.forEach((id: any) => {
      const adminId = {
        professorId: id.registerNumber,
        heading: `Reservation Request For ${reservationInfo.labId}`,
        message: reservationInfo.purpose,
        type: NotificationType.REPORT,
      };

      notificationData.push(adminId);
    });

    await prisma.notifications.createMany({
      data: notificationData,
    });
  }

  return conflictingPeriods;
};

const reservationReview = async (reviewInfo: ReviewInfo) => {
  const reservation = await prisma.reservation.update({
    data: {
      status: reviewInfo.status,
    },
    where: {
      id: reviewInfo.reservationId,
    },
  });

  const { professorId } = reservation;

  // Assigning notification type enum for each notification
  let notificationType: NotificationType;
  if (reservation.status === 'APPROVED') {
    notificationType = NotificationType.RESERVATION_APPROVED;
  } else {
    notificationType = NotificationType.RESERVATION_REJECTED;
  }

  const heading = `Reservation ${reservation.status}`;
  await prisma.notifications.create({
    data: {
      professorId,
      type: notificationType,
      heading,
      message: reservation.purpose,
    },
  });

  return reservation;
};

const reservationDelete = async (reservationInfo: string) => {
  const data = await prisma.reservation.delete({
    where: {
      id: reservationInfo,
    },
  });

  return data;
};

export { reservationCreate, reservationReview, reservationDelete };
