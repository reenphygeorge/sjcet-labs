/* eslint-disable import/no-extraneous-dependencies */
import { Departments, PrismaClient } from '@prisma/client';
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
  LabTimeTablePeriod,
} from '../helpers/types/user';

const prisma = new PrismaClient();

const patchUserData = async ({
  id,
  registerNumber,
  name,
  email,
  phoneNumber,
  labAdmin,
}: PatchUserData) => {
  await prisma.user.update({
    data: {
      registerNumber,
      name,
      email,
      phoneNumber,
      labAdmin,
    },
    where: {
      id,
    },
  });
};

const dayExists = (timeTablesByDay: TimeTableByDay[] | LabTimeTableByDay[], day: string) => {
  let flag = false;

  timeTablesByDay.forEach((timeTable) => {
    if (!flag) {
      if (timeTable.day === day) {
        flag = true;
      }
    }
  });

  return flag;
};

const getUserDataFromDB = async (authId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      authId,
    },
    include: {
      department: {
        select: {
          name: true,
        },
      },
      timeTable: {
        include: {
          course: {
            select: {
              courseName: true,
            },
          },
          lab: {
            select: {
              labAdmins: {
                select: {
                  id: true,
                  name: true,
                },
              },
              labName: true,
            },
          },
          teachingDepartment: {
            select: {
              name: true,
            },
          },
        },
        orderBy: [
          {
            day: {
              dayNumber: 'asc',
            },
          },
          {
            periodNumber: 'asc',
          },
        ],
      },
      reservation: {
        include: {
          teachingDepartment: {
            select: {
              name: true,
            },
          },
          lab: {
            select: {
              labName: true,
            },
          },
        },
        orderBy: [
          {
            day: {
              dayNumber: 'asc',
            },
          },
          {
            periods: 'asc',
          },
        ],
      },
      report: {
        include: {
          lab: {
            select: {
              labName: true,
            },
          },
        },
      },
      lab: {
        select: {
          labName: true,
        },
      },
    },
  });

  return user;
};

const getUserReportDataFromDB = async (user: any) => {
  const reports: UserReportData[] = [];
  user.report.forEach((report: any) => {
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
      status: report.status,
    };

    reports.push(newReport);
  });

  return reports;
};

const getUserReservationDataFromDB = async (user: any) => {
  const reservations: ReservationData[] = [];

  user.reservation.forEach((reservation: any) => {
    const periods: ReservationPeriod[] = [];

    reservation.periods.forEach((period: any) => {
      const newPeriod: ReservationPeriod = {
        id: reservation.id,
        day: reservation.dayId,
        date: reservation.date.toLocaleDateString(undefined, {
          weekday: undefined,
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        periodNo: period,
      };

      periods.push(newPeriod);
    });

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
        name: reservation.teachingDepartment.name,
      },
      semester: reservation.semester,
      batch: reservation.batch,
      labName: reservation.lab.labName,
      periods,
      purpose: reservation.purpose,
      status: reservation.status,
    };

    reservations.push(newReservation);
  });

  return reservations;
};

const getUserTimeTablesByDay = async (user: any) => {
  const timeTablesByDay: TimeTableByDay[] = [];

  user.timeTable.forEach((timeTable: any) => {
    if (!dayExists(timeTablesByDay, timeTable.dayId)) {
      const newTimeTablesByDay: TimeTableByDay = {
        day: timeTable.dayId,
        periods: [],
      };

      timeTablesByDay.push(newTimeTablesByDay);
    }
  });

  user.timeTable.forEach((timeTable: any) => {
    const index = timeTablesByDay.findIndex((value) => {
      if (value.day === timeTable.dayId) {
        return value;
      }

      return null;
    });

    let department: Departments | null;
    if (timeTable.teachingDepartmentId !== null && timeTable.teachingDepartment !== null) {
      department = {
        id: timeTable.teachingDepartmentId,
        name: timeTable.teachingDepartment.name,
      };
    } else {
      department = null;
    }

    let staffMembers: Staff[] | null = [];
    if (timeTable.lab !== null) {
      timeTable.lab.labAdmins.forEach((staff: any) => {
        const newStaff: Staff = {
          staffID: staff.id,
          staffName: staff.name,
        };

        if (staffMembers !== null) {
          staffMembers.push(newStaff);
        } else {
          staffMembers = [];
          staffMembers.push(newStaff);
        }
      });
    } else {
      staffMembers = null;
    }

    let labName: string | null;
    if (timeTable.lab === null) {
      labName = null;
    } else {
      labName = timeTable.lab.labName;
    }

    let periodName: string | null;
    if (timeTable.course === null) {
      periodName = null;
    } else {
      periodName = timeTable.course.courseName;
    }

    const period: TimeTablePeriod = {
      id: timeTable.id,
      department,
      semester: timeTable.semester,
      batch: timeTable.batch,
      periodName,
      periodNo: timeTable.periodNumber,
      labName,
      staff: staffMembers,
    };

    timeTablesByDay[index].periods.push(period);
  });

  return timeTablesByDay;
};

const getLabDataFromDB = async (labId: string) => {
  const labData = await prisma.lab.findUnique({
    where: {
      id: labId,
    },
    include: {
      report: {
        include: {
          lab: {
            select: {
              labName: true,
            },
          },
          professor: {
            select: {
              name: true,
            },
          },
        },
        orderBy: [
          {
            date: 'asc',
          },
        ],
      },
      reservation: {
        include: {
          professor: {
            select: {
              name: true,
            },
          },
          teachingDepartment: {
            select: {
              name: true,
            },
          },
          lab: {
            select: {
              labName: true,
            },
          },
        },
        orderBy: [
          {
            day: {
              dayNumber: 'asc',
            },
          },
          {
            periods: 'asc',
          },
        ],
      },
      LabTimeTable: {
        include: {
          course: {
            select: {
              courseName: true,
            },
          },
          teachingStaff: {
            select: {
              id: true,
              name: true,
            },
          },
          department: {
            select: {
              name: true,
            },
          },
        },
        orderBy: [
          {
            day: {
              dayNumber: 'asc',
            },
          },
          {
            periodNumber: 'asc',
          },
        ],
      },
    },
  });

  return labData;
};

const getLabReports = async (labData: any) => {
  const reports: UserReport[] = [];
  labData.report.forEach((report: any) => {
    const temp = new Date(report.date);
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
  });

  return reports;
};

const getLabReservations = async (labData: any) => {
  const reservations: UserReservation[] = [];
  labData.reservation.forEach((reservation: any) => {
    const tempDate = new Date(reservation.date);
    const tempDepartment: UserDepartment = {
      id: reservation.teachingDepartmentsId,
      name: reservation.teachingDepartment.name,
    };

    const periods: ReservationPeriod[] = [];
    reservation.periods.forEach((period: any) => {
      const newPeriod: ReservationPeriod = {
        id: reservation.id,
        date: reservation.date.toLocaleDateString(undefined, {
          weekday: undefined,
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        day: reservation.dayId,
        periodNo: period,
      };

      periods.push(newPeriod);
    });

    const tempReservation: UserReservation = {
      id: reservation.id,
      staffName: reservation.professor.name,
      semester: reservation.semester,
      department: tempDepartment,
      dateOfRequest: tempDate.toLocaleDateString(undefined, {
        weekday: undefined,
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      periods,
      purpose: reservation.purpose,
      status: reservation.status,
      batch: reservation.batch,
      labName: reservation.lab.labName,
    };

    reservations.push(tempReservation);
  });

  return reservations;
};

const getLabTimeTablesByDay = async (labData: any) => {
  const labTimeTablesByDay: LabTimeTableByDay[] = [];

  labData.LabTimeTable.forEach((period: any) => {
    if (!dayExists(labTimeTablesByDay, period.dayId)) {
      const newLabTimeTablesByDay: LabTimeTableByDay = {
        day: period.dayId,
        periods: [],
      };

      labTimeTablesByDay.push(newLabTimeTablesByDay);
    }
  });

  labData.LabTimeTable.forEach((period: any) => {
    const index = labTimeTablesByDay.findIndex((value) => {
      if (value.day === period.dayId) {
        return value;
      }

      return null;
    });

    let department: Departments | null;
    if (period.departmentId !== null && period.department !== null) {
      department = {
        id: period.departmentId,
        name: period.department.name,
      };
    } else {
      department = null;
    }

    let staffMembers: Staff[] | null = [];
    if (period.teachingStaff !== null) {
      period.teachingStaff.forEach((staff: any) => {
        const newStaff: Staff = {
          staffID: staff.id,
          staffName: staff.name,
        };

        if (staffMembers !== null) {
          staffMembers.push(newStaff);
        } else {
          staffMembers = [];
          staffMembers.push(newStaff);
        }
      });
    } else {
      staffMembers = null;
    }

    let periodName: string | null;
    if (period.course === null) {
      periodName = null;
    } else {
      periodName = period.course.courseName;
    }

    const newPeriod: LabTimeTablePeriod = {
      id: period.id,
      department,
      semester: period.semester,
      batch: period.batch,
      periodName,
      periodNo: period.periodNumber,
      staff: staffMembers,
    };

    labTimeTablesByDay[index].periods.push(newPeriod);
  });

  return labTimeTablesByDay;
};

const getLabData = async (labId: string) => {
  const labData = await getLabDataFromDB(labId);

  if (labData !== null) {
    const reports: UserReport[] = await getLabReports(labData);

    const reservations: UserReservation[] = await getLabReservations(labData);

    const labTimeTablesByDay: LabTimeTableByDay[] = await getLabTimeTablesByDay(labData);

    const data: UserLabData = {
      id: labData.id,
      labName: labData.labName,
      capacity: labData.capacity,
      report: reports,
      reservation: reservations,
      timeTable: labTimeTablesByDay,
    };

    return data;
  }
  return null;
};

const getUserService = async (authId: string) => {
  const user = await getUserDataFromDB(authId);

  if (user !== null) {
    const reports: UserReportData[] = await getUserReportDataFromDB(user);

    const reservations: ReservationData[] = await getUserReservationDataFromDB(user);

    const timeTablesByDay: TimeTableByDay[] = await getUserTimeTablesByDay(user);

    let labName: string | null = null;

    if (user.lab !== null) {
      labName = user.lab.labName;
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
        name: user.department.name,
      },
      lab: labName,
      labAdmin: user.labAdmin,
      labIncharge: user.labIncharge,
      notifications: null,
      labData: null,
      report: reports,
      reservation: reservations,
      timeTable: timeTablesByDay,
    };

    if (!user?.labAdmin && !user?.labIncharge) {
      return userData;
    }
    const { labId } = user;
    if (labId !== null) {
      const labData = await getLabData(labId);

      const newData = {
        ...userData,
        labData,
      };

      return newData;
    }

    return null;
  }

  return null;
};

export { getUserService, patchUserData };
