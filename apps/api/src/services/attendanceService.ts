import { PrismaClient } from '@prisma/client';
import {
  AbsentStudents,
  AttendanceInfo,
  StudentPositions,
  StudentInfo,
} from '../helpers/types/user';

const prisma = new PrismaClient();

const recordCreate = async ({
  courseCode,
  experimentIds,
  labId,
  periods,
  teachingStaff,
}: AttendanceInfo) => {
  // Converting experimentIds for mapping them
  const experimentIdObjects = experimentIds.map((id) => ({
    id,
  }));

  const staffIds = teachingStaff.map((registerNumber) => ({
    registerNumber,
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
      teachingStaff: {
        connect: staffIds,
      },
    },
  });

  return recordInfo;
};

const getStudentDetails = async (studentinfo: StudentInfo) => {
  // Retreiving the details of the student according to the data provided
  if (studentinfo.labBatch !== null) {
    const data = await prisma.student.findMany({
      where: {
        departmentsId: studentinfo.departmentId,
        semester: studentinfo.semester,
        batch: studentinfo.batch,
        labBatch: studentinfo.labBatch,
      },
    });

    return data;
  }
  const data = await prisma.student.findMany({
    where: {
      departmentsId: studentinfo.departmentId,
      semester: studentinfo.semester,
      batch: studentinfo.batch,
    },
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
