// // // lib/features/dorm/infrastructure/dorm.repository.ts

// // import prisma from "@/lib/common/database/PrismaClient";
// // import { CreateDormDTO, UpdateDormDTO } from "../domain/dorm.entity";

// // export class DormRepository {
// //   async create(data: CreateDormDTO) {
// //     return prisma.dorm.create({ data });
// //   }

// //   async findAll() {
// //     return prisma.dorm.findMany({
// //       orderBy: { name: "asc" },
// //     });
// //   }

// //   async findById(id: string) {
// //     // before update next
// //     return prisma.dorm.findUnique({ where: { id } });

// //     // if (!id) {
// //     //   throw new Error("Dorm ID is required");
// //     // }

// //     // return prisma.dorm.findFirst({
// //     //   where: { id },
// //     // });
// //   }


// //   async update(id: string, data: UpdateDormDTO) {
// //     return prisma.dorm.update({
// //       where: { id },
// //       data,
// //     });
// //   }

// //   async delete(id: string) {
// //     return prisma.dorm.delete({ where: { id } });
// //   }
// // }

// // lib/features/dorm/domain/dorm.repository.ts
// import { CreateDormDTO, UpdateDormDTO } from "../domain/dorm.entity";

// export interface DormRepository {
//   create(data: CreateDormDTO): Promise<any>;
//   findAll(): Promise<any[]>;
//   findById(id: string): Promise<any | null>;
//   update(id: string, data: UpdateDormDTO): Promise<any>;
//   delete(id: string): Promise<any>;
// }
