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

	// Creating the attendance record to map the student positions to
	if (experiments !== null) {
		const recordInfo = await prisma.attendanceRecord.create({
			data: {
				date,
				courseCode,
				labName,
				periods
			},
		})

		// Mapping the experiment details to the attendance record
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
	// Retreiving the details of the student according to the data provided
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
	// Mapping student positions to the attendance record
	const data = await prisma.studentPositions.createMany({
		data: studentPositions
	})

	return data
}

const addAbsentStudents = async (studentData: AbsentStudents[]) => {
	// Mapping the details of the absent students to the attendance record
	const data = await prisma.absentStudents.createMany({
		data: studentData
	})

	return data
}

export{ recordCreate, addStudentPositions, getStudentDetails, addAbsentStudents }