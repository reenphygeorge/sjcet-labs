import { PrismaClient, ReservationStatus } from '@prisma/client';
import { ReservationInfo, ReviewInfo } from '../helpers/types/user';

const prisma = new PrismaClient()

const reservationCreate = async (reservationInfo: ReservationInfo[]) => {
	const data = await prisma.reservation.createMany({
		data: reservationInfo
	})

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
		await prisma.reservation.update({
			data: {
				status: reservationStatus[i]
			},
			where: {
				id: reservationIds[i]
			}
		})

		count += 1
	}
	return count
}

export { reservationCreate, reservationReview }