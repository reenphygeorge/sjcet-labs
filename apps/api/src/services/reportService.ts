import { NotificationType, PrismaClient, ReportStatus } from '@prisma/client';
import { ReportData } from '../helpers/types/user';

const prisma = new PrismaClient();

const createReport = async (reportData: ReportData) => {
	const data = await prisma.report.create({
		data: reportData
	})

	const labAdmins = await prisma.lab.findUnique({
		where: {
			labName: reportData.labId
		},
		select: {
			labAdmins: {
				select: {
					registerNumber: true
				}
			}
		}
	})

	if (labAdmins !== null) {
		for (const id of labAdmins.labAdmins) {
			await prisma.notifications.create({
				data: {
					professorsProfessorId: id.registerNumber,
					heading: reportData.issueDescription,
					type: NotificationType.REPORT
				}
			})
		}
	}

	return data
}

const reviewReport = async (reportIds: string[]) => {
	const data = await prisma.report.updateMany({
		where: {
			id: {
				in: reportIds
			}
		},
		data: {
			status: ReportStatus.SOLVED
		}
	})

	return data
}

const deleteReports = async(reporIds: string[]) => {
	const data = await prisma.report.deleteMany({
		where: {
			id: {
				in: reporIds
			}
		}
	})

	return data
}

export{ createReport, reviewReport, deleteReports }