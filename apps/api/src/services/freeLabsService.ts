import { PrismaClient } from '@prisma/client';
import { FreeLabInfo } from '../helpers/types/user';

const prisma = new PrismaClient()

const getFreeLabsInfo = async (labInfo: FreeLabInfo) => {

	// Getting the details of the labs that are free during the specified day and periods
	const data = await prisma.lab.findMany({
		where: {
			timeTable: {
				none: {
					dayId: labInfo.day,
					periodNumber: {
						in: labInfo.periods
					}
				}
			},
			reservation: {
				none: {
					dayId: labInfo.day,
					period: {
						in: labInfo.periods
					},
					status: 'APPROVED',
					negotiable: false
				}
			}
		},
		select: {
			labName: true,
			reservation: {
				select: {
					negotiable: true,
					status: true
				}
			}
		}
	})

	return data
}

export { getFreeLabsInfo }