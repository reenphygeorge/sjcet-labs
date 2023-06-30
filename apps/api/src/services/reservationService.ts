import { NotificationType, PrismaClient } from '@prisma/client';
import { ReservationInfo, ReviewInfo } from '../helpers/types/user';

const prisma = new PrismaClient()

const reservationCreate = async (reservationInfo: ReservationInfo) => {
	const data = await prisma.reservation.create({
		data: reservationInfo
	})


	// Creating Notifications for the lab administrators
	const labAdmins = await prisma.lab.findUnique({
		where: {
			labName: reservationInfo.labId
		},
		select: {
			labAdmins: true
		}
	})
	
	if (labAdmins !== null) {
		let notificationData = []
		for (const id of labAdmins.labAdmins) {
			const adminId = {
				professorId: id.registerNumber,
				heading: `Reservation Request For ${reservationInfo.labId}`,
				message: reservationInfo.purpose,
				type: NotificationType.REPORT
			}

			notificationData.push(adminId)
		}

		await prisma.notifications.createMany({
			data: notificationData
		})
	}

	return data
}

const reservationReview = async (reviewInfo: ReviewInfo[]) => {
	let count = 0

	for (const review of reviewInfo) {
		const reservation = await prisma.reservation.update({
			data: {
				status: review.status
			},
			where: {
				id: review.reservationId
			}
		})

		count += 1
		
		const professorId = reservation.professorId

		// Assigning notification type enum for each notification
		let notificationType: NotificationType
		if (reservation.status === 'APPROVED') {
			notificationType = NotificationType.RESERVATION_APPROVED
		} else {
			notificationType = NotificationType.RESERVATION_REJECTED
		}

		const heading = "Reservation " + reservation.status 
		await prisma.notifications.create({
			data: {
				professorId: professorId,
				type: notificationType,
				heading,
				message: reservation.purpose
			}
		})
	}
	return count
}

const reservationDelete = async (reservationInfo: string[]) => {
	const data = await prisma.reservation.deleteMany({
		where: {
			id: {
				in: reservationInfo
			}
		}
	})

	return data
}

export { reservationCreate, reservationReview, reservationDelete }