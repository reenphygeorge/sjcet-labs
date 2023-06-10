import express, { Request, Response } from 'express';
import responseHandler from '../helpers/handlers/ResponseHandler';
import errorHandler from '../helpers/handlers/ErrorHandler';
import { reservationCreate } from '../services/reservationService';
import { ReservationInfo } from '../helpers/types/user';

const router = express.Router()

const createReservation = router.post('/create', async (request: Request, response: Response) => {
	try {
		let reservationInfo: ReservationInfo[] = request.body.reservationInfo
		reservationInfo = reservationInfo.map((reservation) => {
			reservation.date = new Date(reservation.date)
			return reservation
		})
		const data = await reservationCreate(reservationInfo)
		responseHandler(data, request, response);	
	} catch (error: Error | any) {
		const message = 'Failed to create reservation';
		error.message = message;
		errorHandler(error, request, response);
	}
})

export { createReservation }