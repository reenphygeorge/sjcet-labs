import { NotificationType, PrismaClient, ReservationStatus } from '@prisma/client';
import { ReservationInfo, ReviewInfo } from '../helpers/types/user';

const prisma = new PrismaClient()

const reservationCreate = async (reservationInfo: ReservationInfo[]) => {
	const data = await prisma.reservation.createMany({
		data: reservationInfo
	})

	for (const reservation of reservationInfo) {
		const labAdmins = await prisma.lab.findUnique({
			where: {
				labName: reservation.labId
			},
			select: {
				labAdmins: true
			}
		})

		if (labAdmins !== null) {
			for (const admin of labAdmins.labAdmins) {
				const heading = `${reservation.labId} Reservation Request`
				await prisma.notifications.create({
					data: {
						professorsProfessorId: admin.registerNumber,
						type: NotificationType.RESERVATION_REQUEST,
						heading,
						message: reservation.purpose
					}
				})
			}
		}		
	} 

	return data
}

const reservationReview = async (reviewInfo: ReviewInfo[]) => {
	let count = 0

	for (const x of reviewInfo) {
		const reservation = await prisma.reservation.update({
			data: {
				status: x.status
			},
			where: {
				id: x.reservationId
			}
		})

		count += 1
		
		const professorId = reservation.professorId

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