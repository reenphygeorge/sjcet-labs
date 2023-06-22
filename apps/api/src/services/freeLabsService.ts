import { PrismaClient } from '@prisma/client';
import { FreeLabInfo } from '../helpers/types/user';

const prisma = new PrismaClient()

const getFreeLabsInfo = async (labInfo: FreeLabInfo) => {

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
					}
				}
			}
		},
		select: {
			labName: true
		}
	})
	console.log(data)
	return data
}

export { getFreeLabsInfo }