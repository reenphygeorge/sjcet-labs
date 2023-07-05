/* eslint-disable import/no-extraneous-dependencies */
import { Departments, PrismaClient, TimeTable } from '@prisma/client';
import {
  UserDepartment,
  UserLabData,
  PatchUserData,
  UserReport,
  UserReservation,
  UserContextData,
  UserReportData,
  ReservationData,
  ReservationPeriod,
  TimeTableByDay,
  TimeTablePeriod,
  Staff,
  LabTimeTableByDay,
  LabTimeTablePeriod
} from '../helpers/types/user';

const prisma = new PrismaClient();

const getUserService = async (authId: string) => {
	const user = await getUserDataFromDB(authId)

	if (user !== null) {
		const reports: UserReportData[] = await getUserReportDataFromDB(user)
	
		const reservations: ReservationData[] = await getUserReservationDataFromDB(user)
	
		const timeTablesByDay: TimeTableByDay[] = await getUserTimeTablesByDay(user)

		let labName: string | null = null

		if (user.lab !== null) {
			labName = user.lab.labName
		}
	
		const userData: UserContextData = {
			id: user.id,
			authId: user.authId,
			registerNumber: user.registerNumber,
			name: user.name,
			gender: user.gender,
			email: user.email,
			phoneNumber: user.phoneNumber,
			department: {
				id: user.departmentId,
				name: user.department.name
			},
			lab: labName,
			labAdmin: user.labAdmin,
			labIncharge: user.labIncharge,
			notifications: null,
			labData: null,
			report: reports,
			reservation: reservations,
			timeTable: timeTablesByDay
		}

		if (!user?.labAdmin && !user?.labIncharge) {
			return userData;
		} else if (user?.labAdmin || user?.labIncharge) {
			const labId = user.labId;
			if (labId !== null) {
				const labData = await getLabData(labId);

				const newData = {
					...userData,
					labData,
				};

				return newData;
			}
		}
	} else {
		return null;
	}
};

const getLabData = async (labId: string) => {
	const labData = await getLabDataFromDB(labId)

	if (labData !== null) {
		let reports: UserReport[] = await getLabReports(labData)

		let reservations: UserReservation[] = await getLabReservations(labData)

		const labTimeTablesByDay: LabTimeTableByDay[] = await getLabTimeTablesByDay(labData)
		
		let data: UserLabData = {
			id: labData.id,
			labName: labData.labName,
			capacity: labData.capacity,
			report: reports,
			reservation: reservations,
			timeTable: labTimeTablesByDay
		}

		return data
	} else {
		return null
	}
}

const patchUserData = async ({id, registerNumber, name, email, phoneNumber}: PatchUserData) => {
	await prisma.user.update({
    	data: {
			registerNumber,
			name,
			email,
			phoneNumber
		},
		where: {
			id
		}
	})
}

const dayExists = (timeTablesByDay: TimeTableByDay[] | LabTimeTableByDay[], day: string) => {
	let flag = false
	for (const timeTable of timeTablesByDay) {
		if (timeTable.day === day) {
			flag = true
			break
		}
	}

	return flag
}

const getUserDataFromDB = async (authId: string) => {
	const user = await prisma.user.findUnique({
		where: {
    		authId
    	},
    	include: {
			department: {
				select: {
					name: true
				}
			},
      		timeTable: {
				include: {
					course: {
						select: {
							courseName: true
						}
					},
					lab: {
						select: {
							labAdmins: {
								select: {
									id: true,
									name: true
								}
							},
							labName: true
						}
					},
					teachingDepartment: {
						select: {
							name: true
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
						periodNumber: 'asc'
					}
				]
			},
			reservation: {
				include: {
					teachingDepartment: {
						select: {
							name: true
						}
					},
					lab: {
						select: {
							labName: true
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
			report: {
				include: {
					lab: {
						select: {
							labName: true
						}
					}
				}
			},
			lab: {
				select: {
					labName: true
				}
			}
		}
	})

	return user
}

const getUserReportDataFromDB = async (user: any) => {
	const reports: UserReportData[] = []
	for (const report of user.report) {
		const newReport: UserReportData = {
			id: report.id,
			date: report.date.toLocaleDateString(undefined, {
				weekday: undefined,
				year: 'numeric',
				month: 'long',
				day: 'numeric',
			}),
			labName: report.lab.labName,
			timing: report.date.toLocaleDateString(undefined, {
				weekday: undefined,
				year: 'numeric',
				month: 'long',
				day: 'numeric',
			}),
			issue: report.issueDescription,
			systemNo: report.systems,
			status: report.status
		}

		reports.push(newReport)
	}

	return reports
}

const getUserReservationDataFromDB = async (user: any) => {
	const reservations: ReservationData[] = []
	
	for (const reservation of user.reservation) {
		const periods: ReservationPeriod[] = []

		for (const period of reservation.periods) {
			const newPeriod: ReservationPeriod = {
				id: reservation.id,
				day: reservation.dayId,
				date: reservation.date.toLocaleDateString(undefined, {
					weekday: undefined,
					year: 'numeric',
					month: 'long',
					day: 'numeric',
				}),
				periodNo: period
			}

			periods.push(newPeriod)
		}

		const newReservation: ReservationData = {
			id: reservation.id,
			dateOfRequest: reservation.date.toLocaleDateString(undefined, {
				weekday: undefined,
				year: 'numeric',
				month: 'long',
				day: 'numeric',
			}),
			department: {
				id: reservation.teachingDepartmentsId,
				name: reservation.teachingDepartment.name
			},
			semester: reservation.semester,
			batch: reservation.batch,
			labName: reservation.lab.labName,
			periods,
			purpose: reservation.purpose,
			status: reservation.status 
		}

		reservations.push(newReservation)
	}

	return reservations
}

const getUserTimeTablesByDay = async (user: any) => {
	const timeTablesByDay: TimeTableByDay[] = []
	
	for (const timeTable of user.timeTable) {
		if (!dayExists(timeTablesByDay, timeTable.dayId)) {
			const newTimeTablesByDay: TimeTableByDay = {
				day: timeTable.dayId,
				periods: []
			}

			timeTablesByDay.push(newTimeTablesByDay)
		}
	}

	for (const timeTable of user.timeTable) {
		const index = timeTablesByDay.findIndex(value => {
			if (value.day === timeTable.dayId) {
				return value
			}
		})

		let department: Departments | null
		if (timeTable.teachingDepartmentId !== null && timeTable.teachingDepartment !== null) {
			department = {
				id: timeTable.teachingDepartmentId,
				name: timeTable.teachingDepartment.name
			}
		} else {
			department = null
		}

		let staffMembers: Staff[] | null = []
		if (timeTable.lab !== null) {
			for (const staff of timeTable.lab.labAdmins) {
				const newStaff: Staff = {
					staffID: staff.id,
					staffName: staff.name
				}

				staffMembers.push(newStaff)
			}

		} else {
			staffMembers = null
		}

		let labName: string | null
		if (timeTable.lab === null) {
			labName = null
		} else {
			labName = timeTable.lab.labName
		}

		let periodName: string | null
		if (timeTable.course === null) {
			periodName = null
		} else {
			periodName = timeTable.course.courseName
		}

		const period: TimeTablePeriod = {
			id: timeTable.id,
			department,
			semester: timeTable.semester,
			batch: timeTable.batch,
			periodName,
			periodNo: timeTable.periodNumber,
			labName,
			staff: staffMembers
		}

		timeTablesByDay[index].periods.push(period)
	}

	return timeTablesByDay
}

const getLabDataFromDB = async (labId: string) => {
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
							labName: true
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
				include: {
					course: {
						select: {
							courseName: true
						}
					},
					teachingStaff: {
						select: {
							id: true,
							name: true
						}
					},
					department: {
						select: {
							name: true
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
						periodNumber: 'asc'
					}
				]
			}
    	}
	})

	return labData
}

const getLabReports = async (labData: any) => {
	let reports: UserReport[] = [];
	for (const report of labData.report) {
		let temp = new Date(report.date);
		const tempReport: UserReport = {
			id: report.id,
			staffName: report.professor.name,
			date: temp.toLocaleDateString(undefined, {
				weekday: undefined,
				year: 'numeric',
				month: 'long',
				day: 'numeric',
			}),
			timing: temp.toLocaleTimeString(undefined, {
				hour: 'numeric',
				minute: 'numeric',
				second: undefined,
			}),
			systemNo: report.systems,
			issue: report.issueDescription,
			status: report.status,
		};
		reports.push(tempReport);
	}

	return reports
}

const getLabReservations = async (labData: any) => {
	let reservations: UserReservation[] = []
	for (const reservation of labData.reservation) {
		let tempDate = new Date(reservation.date)
		let tempDepartment: UserDepartment = {
			id: reservation.teachingDepartmentsId,
			name: reservation.teachingDepartment.name
		}

		let periods: ReservationPeriod[] = []
		for (const period of reservation.periods) {
			const newPeriod: ReservationPeriod = {
				id: reservation.id,
				date: reservation.date.toLocaleDateString(undefined, {
					weekday: undefined,
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				}),
				day: reservation.dayId,
				periodNo: period
			}

			periods.push(newPeriod)
		}

		const tempReservation: UserReservation = {
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
			periods,
			purpose: reservation.purpose,
			status: reservation.status,
			batch: reservation.batch,
			labName: reservation.lab.labName
		}

		reservations.push(tempReservation)
	}

	return reservations
}

const getLabTimeTablesByDay = async (labData: any) => {
	const labTimeTablesByDay: LabTimeTableByDay[] = []

	for (const period of labData.LabTimeTable) {
		if (!dayExists(labTimeTablesByDay, period.dayId)) {
			const newLabTimeTablesByDay: LabTimeTableByDay = {
				day: period.dayId,
				periods: []
			}

			labTimeTablesByDay.push(newLabTimeTablesByDay)
		}
	}

	for (const period of labData.LabTimeTable) {
		const index = labTimeTablesByDay.findIndex(value => {
			if (value.day === period.dayId) {
				return value
			}
		})

		let department: Departments | null
		if (period.departmentId !== null && period.department !== null) {
			department = {
				id: period.departmentId,
				name: period.department.name
			}
		} else {
			department = null
		}

		let staffMembers: Staff[] | null = []
		if (period.teachingStaff !== null) {
			for (const staff of period.teachingStaff) {
				const newStaff: Staff = {
					staffID: staff.id,
					staffName: staff.name
				}

				staffMembers.push(newStaff)
			}

		} else {
			staffMembers = null
		}

		let periodName: string | null
		if (period.course === null) {
			periodName = null
		} else {
			periodName = period.course.courseName
		}

		const newPeriod: LabTimeTablePeriod = {
			id: period.id,
			department,
			semester: period.semester,
			batch: period.batch,
			periodName,
			periodNo: period.periodNumber,
			staff: staffMembers				
		}

		labTimeTablesByDay[index].periods.push(newPeriod)
	}

	return labTimeTablesByDay
}

export { getUserService, patchUserData };
