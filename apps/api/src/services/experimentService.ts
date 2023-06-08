import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

const getExperiments = async (courseCode: string) => {
	const data = await prisma.experiments.findMany({
		where: {
			courseCode: courseCode
		}
	})

	return data
}

export { getExperiments }