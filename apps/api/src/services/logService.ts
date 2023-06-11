import { PrismaClient } from '@prisma/client';
import { LogData } from '../helpers/types/user';

const prisma = new PrismaClient();

const getLogs = async ({date, labName, periods}: LogData) => {
	const data = await prisma.attendanceRecord.findMany({
		where: {
			date,
			labName,
			periods: {
				hasEvery: periods
			}
		},
		include: {
			studentPositions: {
				select: {
					studentId: true,
					systemNumber: true,
					student: {
						select: {
							name: true
						}
					}
				}
			},
			absentStudents: {
				select: {
					studentId: true,
					student: {
						select: {
							name: true
						}
					}
				}
			}
		}
	})

	return data
}

export { getLogs }