import { NotificationType, PrismaClient, ReservationStatus } from '@prisma/client';
import { ReservationInfo, ReviewInfo } from '../helpers/types/user';

const prisma = new PrismaClient()

const reservationCreate = async (reservationInfo: ReservationInfo[]) => {
	const data = await prisma.reservation.createMany({
		data: reservationInfo
	})

	const labNames = reservationInfo.map((reservation) => {
		return reservation.labId
	})

	for (const labName of labNames) {
		const labAdmins = await prisma.lab.findUnique({
			where: {
				labName
			},
			select: {
				labAdmins: true
			}
		})

		if (labAdmins !== null) {
			for (const admin of labAdmins.labAdmins) {
				const heading = "Request For Lab Reservation"
				await prisma.notifications.create({
					data: {
						professorsProfessorId: admin.registerNumber,
						type: NotificationType.RESERVATION_REQUEST,
						heading
					}
				})
			}
		}
	} 

	return data
}

const reservationReview = async (reviewInfo: ReviewInfo[]) => {
	const reservationIds = reviewInfo.map((reservation) => {
		return reservation.reservationId
	})

	const reservationStatus = reviewInfo.map((reservation) => {
		let status: ReservationStatus
		if (reservation.status === 'APPROVED') {
			status = ReservationStatus.APPROVED
		} else if (reservation.status === 'REJECTED') {
			status = ReservationStatus.REJECTED
		} else {
			status = ReservationStatus.REQUESTED
		}
		return status
	})

	let count = 0

	for (let i = 0; i < reviewInfo.length; ++i) {
		const reservation = await prisma.reservation.update({
			data: {
				status: reservationStatus[i]
			},
			where: {
				id: reservationIds[i]
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
				heading
			}
		})
	}
	return count
}

export { reservationCreate, reservationReview }