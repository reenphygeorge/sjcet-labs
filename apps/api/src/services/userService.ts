/* eslint-disable import/no-extraneous-dependencies */
import { PrismaClient } from '@prisma/client';
import { DepartmentNew, LabData, PatchUserData, ReportNew, ReservationNew } from '../helpers/types/user';

const prisma = new PrismaClient();

const getUserService = async (authId: string) => {
	const user = await prisma.user.findUnique({
		where: {
    		authId
    	},
    	include: {
      		timeTable: {
				orderBy: [
					{
						day: {
							dayNumber: 'asc'
						}
					},
					{
						periodNumber: 'asc'
					}
				]
			},
			reservation: {
				orderBy: [
					{
						day: {
							dayNumber: 'asc'
						}
					},
					{
						periods: 'asc'
					}
				]
			},
			notifications: true,
			report: true
		}
	})

	if (user !== null) {
		if (!user?.labAdmin && !user?.labIncharge) {
			return user;
		} else if (user?.labAdmin || user?.labIncharge) {
			const labId = user.labId
			if (labId !== null) {
				const labData = await getLabData(labId)

				const newData = {
          			...user,
          			labData
				}

				return newData
			}
		}
	} else {
    	return null
  	}
}

const getLabData = async (labId: string) => {
	const labData = await prisma.lab.findUnique({
    	where: {
      		id: labId
    	},
    	include: {
      		report: {
				include: {
					lab: {
						select: {
							labName: true
						}
					},
					professor: {
						select: {
							name: true
						}
					}
				},
				orderBy: [
					{
						date: 'asc'
					}
				]
			},
      		reservation: {
				include: {
					professor: {
						select: {
							name: true
						}
					},
					teachingDepartment: {
						select: {
							name: true
						}
					},
					lab: {
						select: {
							venue: true
						}
					}
				},
				orderBy: [
					{
						day: {
							dayNumber: 'asc'
						}
					},
					{
						periods: 'asc'
					}
				]
			},
			LabTimeTable: {
				orderBy: [
					{
						day: {
							dayNumber: 'asc'
						}
					},
					{
						periodNumber: 'asc'
					}
				]
			}
    	}
	})

	if (labData !== null) {
		let reports: ReportNew[] = []
		for (const report of labData.report) {
			let temp = new Date(report.date)
			const tempReport: ReportNew = {
				id: report.id,
				staffName: report.professor.name,
				date: temp.toLocaleDateString(undefined, {
					weekday: undefined,
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				}),
				timing: temp.toLocaleTimeString(undefined, {
					hour: 'numeric',
					minute: 'numeric',
					second: undefined
				}),
				systemNo: report.systems,
				issue: report.issueDescription,
				status: report.status
			}
			reports.push(tempReport)
		}

		let reservations: ReservationNew[] = []
		for (const reservation of labData.reservation) {
			let tempDate = new Date(reservation.date)
			let tempDepartment: DepartmentNew = {
				id: reservation.teachingDepartmentsId,
				name: reservation.teachingDepartment.name,
				batch: reservation.batch
			}
			const tempReservation: ReservationNew = {
				id: reservation.id,
				staffName: reservation.professor.name,
				semester: reservation.semester,
				department: tempDepartment,
				dateOfRequest: tempDate.toLocaleDateString(undefined, {
					weekday: undefined,
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				}),
				periods: reservation.periods,
				venue: reservation.lab.venue,
				purpose: reservation.purpose,
				status: reservation.status
			}

			reservations.push(tempReservation)
		}
		
		let data: LabData = {
			id: labData.id,
			labName: labData.labName,
			capacity: labData.capacity,
			roomNumber: labData.roomNumber,
			venue: labData.venue,
			report: reports,
			reservation: reservations,
			timeTable: labData.LabTimeTable
		}
		return data
	} else {
		return null
	}

}

const patchUserData = async ({authId, registerNumber, name, departmentId, email, phoneNumber}: PatchUserData) => {
	await prisma.user.update({
    	data: {
			registerNumber,
			name,
			departmentId,
			email,
			phoneNumber
		},
		where: {
			authId
		}
	})
}

export { getUserService, patchUserData };
