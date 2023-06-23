import { NotificationType, PrismaClient } from '@prisma/client';
import { ReservationInfo, ReviewInfo } from '../helpers/types/user';

const prisma = new PrismaClient()

const reservationCreate = async (reservationInfo: ReservationInfo) => {

	let reservations = []
	for (const period of reservationInfo.periods) {
		const data = {
			professorId: reservationInfo.professorId,
			teachingDepartmentsId: reservationInfo.teachingDepartmentsId,
			semester: reservationInfo.semester,
			batch: reservationInfo.batch,
			dayId: reservationInfo.dayId,
			coursesId: reservationInfo.coursesId,
			labId: reservationInfo.labId,
			negotiable: reservationInfo.negotiable,
			period: period,
			purpose: reservationInfo.purpose
		}

		reservations.push(data)
	}

	const data = await prisma.reservation.createMany({
		data: reservations
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
		for (const admin of labAdmins.labAdmins) {
			const heading = `${reservationInfo.labId} Reservation Request`
			await prisma.notifications.create({
				data: {
					professorsProfessorId: admin.registerNumber,
					type: NotificationType.RESERVATION_REQUEST,
					heading,
					message: reservationInfo.purpose
				}
			})
		}
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
				professorsProfessorId: professorId,
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