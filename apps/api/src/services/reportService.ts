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
			},
			labName: true
		}
	})

	// Creating notifications for the lab administrators
	if (labAdmins !== null) {
		let notificationData = []
		for (const id of labAdmins.labAdmins) {
			const adminId = {
				professorId: id.registerNumber,
				heading: `Report For ${labAdmins.labName}`,
				message: reportData.issueDescription,
				type: NotificationType.REPORT
			}

			notificationData.push(adminId)
		}
		
		await prisma.notifications.createMany({
			data: notificationData
		})
	}

	return data
}

const reviewReport = async (reportId: string) => {
	const data = await prisma.report.update({
		where: {
			id: reportId
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