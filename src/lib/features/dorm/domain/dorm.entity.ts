// lib/features/dorm/domain/dorm.entity.ts

export interface DormEntity {
  id: string;
  name: string;
  gender: "PUTRA" | "PUTRI" | "CAMPUR";
  powerCapacity: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateDormDTO {
  name: string;
  gender: "PUTRA" | "PUTRI" | "CAMPUR";
  powerCapacity: number;
}

export interface UpdateDormDTO {
  name?: string;
  gender?: "PUTRA" | "PUTRI" | "CAMPUR";
  powerCapacity?: number;
}
