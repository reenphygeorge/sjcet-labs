import { PrismaClient } from '@prisma/client';
import { ReservationInfo } from '../helpers/types/user';

const prisma = new PrismaClient()

const reservationCreate = async (reservationInfo: ReservationInfo[]) => {
	const data = await prisma.reservation.createMany({
		data: reservationInfo
	})

	return data
}

export { reservationCreate }