import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const viewNotifications= async (notificationIds: string[]) => {
	const data = await prisma.notifications.updateMany({
		data: {
			seen: true
		},
		where: {
			id: {
				in: notificationIds
			}
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