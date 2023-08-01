import { PrismaClient } from '@prisma/client';
import { FreeLabResponseInfo } from '../helpers/types/user';

const prisma = new PrismaClient();

export enum LabStatus {
  AVAILABLE = 'AVAILABLE',
  RESERVED = 'RESERVED',
  CLASSTIME = 'CLASSTIME',
}

const getFreeLabsInfo = async (labId: string) => {
  // Getting the details of the labs that are free during the specified day and periods
  // const labData = await prisma.lab.findMany({
  //   select: {
  //     id: true,
  //     labName: true,
  //     reservation: {
  //       include: {
  //         professor: {
  //           select: {
  //             registerNumber: true,
  //             name: true,
  //           },
  //         },
  //       },
  //       where: {
  //         status: 'APPROVED',
  //       },
  //     },
  //     timeTable: {
  //       select: {
  //         periodNumber: true,
  //         dayId: true,
  //       },
  //     },
  //   },
  // });

  const labData = await prisma.lab.findUnique({
    select: {
      labName: true,
      reservation: {
        include: {
          professor: {
            select: {
              registerNumber: true,
              name: true,
            },
          },
        },
      },
      timeTable: {
        select: {
          periodNumber: true,
          dayId: true,
        },
        orderBy: {
          day: {
            dayNumber: 'asc',
          },
        },
      },
    },
    where: {
      id: labId,
    },
  });

  const data: FreeLabResponseInfo[] = [];

  // for (const lab of labData) {
  // 	let flag = true
  // 	for (const period of lab.timeTable) {
  // 		for (const info of labInfo) {
  // 			if (period.dayId === info.day && period.periodNumber === info.periodNumber) {
  // 				flag = false
  // 				const freeLab: FreeLabResponseInfo = {
  // 					labName: lab.labName,
  // 					reservation: null,
  // 					status: LabStatus.CLASSTIME
  // 				}

  // 				data.push(freeLab)
  // 				break
  // 			}
  // 		}
  // 		if (flag === false) {
  // 			break
  // 		}
  // 	}

  // 	if (flag === true) {
  // 		if (lab.reservation[0] !== undefined) {
  // 			for (const infoPeriod of labInfo) {
  // 				const reservation = lab.reservation[0]
  // 				let flag = true
  // 				for (const reservationPeriod of reservation.periods) {
  // 					if (reservationPeriod === infoPeriod.periodNumber) {
  // 						flag = false

  // 						const freeLab: FreeLabResponseInfo = {
  // 							labName: lab.labName,
  // 							reservation: lab.reservation[0],
  // 							status: LabStatus.RESERVED
  // 						}
  // 						data.push(freeLab)

  // 						break
  // 					}
  // 				}
  // 				if (flag === false) {
  // 					break
  // 				}
  // 			}

  // 			if (flag === true) {
  // 				const freeLab: FreeLabResponseInfo = {
  // 					labName: lab.labName,
  // 					reservation: null,
  // 					status: LabStatus.AVAILABLE
  // 				}
  // 				data.push(freeLab)
  // 			}
  // 		} else {
  // 			const freeLab: FreeLabResponseInfo = {
  // 				labName: lab.labName,
  // 				reservation: null,
  // 				status: LabStatus.AVAILABLE
  // 			}
  // 			data.push(freeLab)
  // 		}
  // 	}
  // }

  if (labData === null) {
    return null;
  }

  // labData.forEach((lab: any) => {
  //   let flag1 = false;
  //   lab.timeTable.forEach((period: any) => {
  //     if (period.dayId === labInfo.day) {
  //       let flag2 = false;
  //       labInfo.periodNumbers.forEach((periodNumber: any) => {
  //         if (periodNumber === period.periodNumber) {
  //           const freeLab: FreeLabResponseInfo = {
  //             id: lab.id,
  //             labName: lab.labName,
  //             status: LabStatus.CLASSTIME,
  //             reservation: null,
  //           };

  //           data.push(freeLab);
  //           flag2 = true;
  //           break;
  //         }
  //       });

  //       if (flag2 === false) {
  //         if (lab.reservation[0] !== undefined) {
  //           const freeLab: FreeLabResponseInfo = {
  //             id: lab.id,
  //             labName: lab.labName,
  //             status: LabStatus.RESERVED,
  //             reservation: lab.reservation[0],
  //           };

  //           data.push(freeLab);
  //         } else {
  //           const freeLab: FreeLabResponseInfo = {
  //             id: lab.id,
  //             labName: lab.labName,
  //             status: LabStatus.AVAILABLE,
  //             reservation: null,
  //           };

  //           data.push(freeLab);
  //         }
  //       }

  //       flag1 = true;
  //       break;
  //     }
  //   });

  //   if (flag1 === false) {
  //     const freeLab: FreeLabResponseInfo = {
  //       id: lab.id,
  //       labName: lab.labName,
  //       status: LabStatus.AVAILABLE,
  //       reservation: lab.reservation[0],
  //     };

  //     data.push(freeLab);
  //   }
  // });

  return data;
};

export { getFreeLabsInfo };
