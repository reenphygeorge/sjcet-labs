import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getDepartmentService = async () => {
	const data = await prisma.departments.findMany()

	return data
}

export { getDepartmentService }