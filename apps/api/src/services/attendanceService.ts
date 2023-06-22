import { PrismaClient } from '@prisma/client';
import { AbsentStudents, AttendanceInfo, StudentPositions } from '../helpers/types/user';
import { StudentInfo } from '../helpers/types/user';

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

		for (const expreimentId of experimentIds) {
			await prisma.attendanceRecord.update({
				data: {
					experiments: {
						connect: {
							id: expreimentId
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

const getStudentDetails = async (studentinfo: StudentInfo) => {
	if (studentinfo.labBatch !== null) {
		const data = await prisma.student.findMany({
			where: {
				departmentsId: studentinfo.departmentId,
				semester: studentinfo.semester,
				batch: studentinfo.batch,
				labBatch: studentinfo.labBatch
			}
		})

		return data
	} else {
		const data = await prisma.student.findMany({
			where: {
				departmentsId: studentinfo.departmentId,
				semester: studentinfo.semester,
				batch: studentinfo.batch
			}
		})

		return data
	}
}

const addStudentPositions = async (studentPositions: StudentPositions[]) => {
	const data = await prisma.studentPositions.createMany({
		data: studentPositions
	})

	return data
}

const addAbsentStudents = async (studentData: AbsentStudents[]) => {
	const data = await prisma.absentStudents.createMany({
		data: studentData
	})

	return data
}

export{ recordCreate, addStudentPositions, getStudentDetails, addAbsentStudents }