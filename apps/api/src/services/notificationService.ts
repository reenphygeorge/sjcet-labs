import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const viewNotifications = async (notificationId: string) => {
  const data = await prisma.notifications.update({
    data: {
      seen: true,
    },
    where: {
      id: notificationId,
    },
  });

  return data;
};

const deleteNotifications = async (notificationId: string) => {
  const data = await prisma.notifications.delete({
    where: {
      id: notificationId,
    },
  });

  return data;
};

export { viewNotifications, deleteNotifications };
