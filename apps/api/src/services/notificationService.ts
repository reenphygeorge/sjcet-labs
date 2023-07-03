import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const viewNotifications = async (notificationId: string) => {
	const data = await prisma.notifications.update({
		data: {
			seen: true
		},
		where: {
			id: notificationId
		}
	})

	return data
}

const deleteNotifications = async (notificationIds: string[]) => {
	const data = await prisma.notifications.deleteMany({
		where: {
			id: {
				in: notificationIds
			}
		}
	})

	return data
}

export { viewNotifications, deleteNotifications }