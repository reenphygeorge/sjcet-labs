import { PrismaClient } from '@prisma/client';
import { AttendanceInfo, StudentPositions } from '../helpers/types/user';

const prisma = new PrismaClient()

const recordCreate = async ({date, courseCode, experimentIds, labName, periods}: AttendanceInfo) => { 
	let experiments = await prisma.experiments.findMany({
		where: {
			id: {
				in: experimentIds
			}
		}
	})

	if (experiments !== null) {
		const recordInfo = await prisma.attendanceRecord.create({
			data: {
				date,
				courseCode,
				labName,
				periods
			},
		})

		for (let i = 0; i < experimentIds.length; ++i) {
			await prisma.attendanceRecord.update({
				data: {
					experiments: {
						connect: {
							id: experimentIds[i]
						}
					}
				},
				where: {
					id: recordInfo.id
				}
			})
		}

		return recordInfo
	}
}

const addStudentPositions = async (studentPositions: StudentPositions[]) => {
	await prisma.studentPositions.createMany({
		data: studentPositions
	})
}

export{ recordCreate, addStudentPositions }