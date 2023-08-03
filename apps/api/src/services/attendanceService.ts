import { PrismaClient } from '@prisma/client';
import { AbsentStudents, AttendanceInfo, StudentPositions } from '../helpers/types/user';

const prisma = new PrismaClient();

const recordCreate = async ({ courseCode, experimentIds, labId, periods }: AttendanceInfo) => {
  // Converting experimentIds for mapping them
  const experimentIdObjects = experimentIds.map((id) => ({
    id,
  }));

  // Creating the attendance record and mapping the experiment ids to it
  const recordInfo = await prisma.attendanceRecord.create({
    data: {
      courseCode,
      labId,
      periods,
      experiments: {
        connect: experimentIdObjects,
      },
    },
  });

  return recordInfo;
};

const getStudentDetails = async (studentinfo: any) => {
  // Retreiving the details of the student according to the data provided
  if (studentinfo.labBatch !== undefined) {
    const data = await prisma.student.findMany({
      where: {
        departmentsId: studentinfo.departmentId,
        semester: Number(studentinfo.semester),
        batch: studentinfo.batch,
        labBatch: Number(studentinfo.labBatch),
      },
      take: Number(studentinfo.entries),
      skip: (Number(studentinfo.page) - 1) * Number(studentinfo.entries),
    });

    return data;
  }

  const data = await prisma.student.findMany({
    where: {
      departmentsId: studentinfo.departmentId,
      semester: Number(studentinfo.semester),
      batch: studentinfo.batch,
    },
    take: Number(studentinfo.entries),
    skip: (Number(studentinfo.page) - 1) * Number(studentinfo.entries),
  });

  return data;
};

const addStudentPositions = async (studentPositions: StudentPositions[]) => {
  // Mapping student positions to the attendance record
  const data = await prisma.studentPositions.createMany({
    data: studentPositions,
  });

  return data;
};

const addAbsentStudents = async (studentData: AbsentStudents[]) => {
  // Mapping the details of the absent students to the attendance record
  const data = await prisma.absentStudents.createMany({
    data: studentData,
  });

  return data;
};

export { recordCreate, addStudentPositions, getStudentDetails, addAbsentStudents };
