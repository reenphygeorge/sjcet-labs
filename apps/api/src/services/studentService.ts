import { PrismaClient } from '@prisma/client';
import { StudentInfo } from '../helpers/types/user';

const prisma = new PrismaClient()

const getStudentService = async (studentinfo: StudentInfo) => {
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

export { getStudentService }