import { PrismaClient } from '@prisma/client';
import { FreeLabRequestInfo, FreeLabResponseInfo } from '../helpers/types/user';

const prisma = new PrismaClient()

const getFreeLabsInfo = async (labInfo: FreeLabRequestInfo) => {
	// Getting the details of the labs that are free during the specified day and periods
	const labData = await prisma.lab.findMany({
		select: {
			labName: true,
			reservation: {
				include: {
					professor: {
						select: {
							registerNumber: true,
							name: true
						}
					}
				},
				where: {
					status: 'APPROVED'
				}
			},
			timeTable: {
				select: {
					periodNumber: true,
					dayId: true
				}
			}
		}
	})

	const data: FreeLabResponseInfo[] = []

	for (const lab of labData) {
		let flag1 = false
		for (const period of lab.timeTable) {
			if (period.dayId === labInfo.day) {
				let flag2 = false
				for (const periodNumber of labInfo.periods) {
					if (periodNumber === period.periodNumber) {
						const freeLab: FreeLabResponseInfo = {
							labName: lab.labName,
							reservation: lab.reservation[0],
							freeOfTimeTable: false
						}

						data.push(freeLab)
						flag2 = true
						break
					}
				}

				if (flag2 === false) {
					const freeLab: FreeLabResponseInfo = {
						labName: lab.labName,
						reservation: lab.reservation[0],
						freeOfTimeTable: true
					}

					data.push(freeLab)
				}

				flag1 = true
				break
			}
		}

		if (flag1 === false) {
			const freeLab: FreeLabResponseInfo = {
				labName: lab.labName,
				reservation: lab.reservation[0],
				freeOfTimeTable: true
			}

			data.push(freeLab)
		}
	}

	return data
}

export { getFreeLabsInfo }