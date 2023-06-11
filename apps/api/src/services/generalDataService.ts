import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getGeneralData = async () => {
	const departments = await prisma.departments.findMany()

	const courses = await prisma.courses.findMany()

	const labs = await prisma.lab.findMany()

	const data = {
		departments,
		courses,
		labs
	}

	return data
}

export { getGeneralData }