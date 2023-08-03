import { NotificationType, PrismaClient, ReportStatus } from '@prisma/client';
import { ReportData } from '../helpers/types/user';

const prisma = new PrismaClient();

const createReport = async (reportData: ReportData) => {
  const data = await prisma.report.create({
    data: reportData,
  });

  const labAdmins = await prisma.lab.findUnique({
    where: {
      id: reportData.labId,
    },
    select: {
      labAdmins: {
        select: {
          registerNumber: true,
        },
      },
      labName: true,
    },
  });

  // Creating notifications for the lab administrators
  if (labAdmins !== null) {
    const notificationData: any = [];
    labAdmins.labAdmins.forEach((id: any) => {
      const adminId = {
        professorId: id.registerNumber,
        heading: `Report For ${labAdmins.labName}`,
        message: reportData.issueDescription,
        type: NotificationType.REPORT,
      };

      notificationData.push(adminId);
    });

    await prisma.notifications.createMany({
      data: notificationData,
    });
  }

  return data;
};

const reviewReport = async (reportId: string) => {
  const data = await prisma.report.update({
    where: {
      id: reportId,
    },
    data: {
      status: ReportStatus.SOLVED,
    },
  });

  await prisma.notifications.create({
    data: {
      professorId: data.professorId,
      heading: 'Report Resolved',
      message: data.issueDescription,
      type: NotificationType.REPORT,
    },
  });

  return data;
};

const deleteReports = async (reporId: string) => {
  const data = await prisma.report.delete({
    where: {
      id: reporId,
    },
  });

  return data;
};

export { createReport, reviewReport, deleteReports };
