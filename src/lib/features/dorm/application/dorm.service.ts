// // lib/features/dorm/application/dorm.service.ts

// import {
//   CreateDormDTO,
//   UpdateDormDTO,
// } from "../domain/dorm.entity";
// import { DormRepository } from "../infrastructure/dorm.repository";

// export class DormService {
//   private repo: DormRepository;

//   constructor() {
//     this.repo = new DormRepository();
//   }

//   async create(data: CreateDormDTO) {
//     return this.repo.create(data);
//   }

//   async getAll() {
//     return this.repo.findAll();
//   }

//   async getById(id: string) {
//     const dorm = await this.repo.findById(id);
//     if (!dorm) throw new Error("Asrama tidak ditemukan");
//     return dorm;
//   }

//   async update(id: string, data: UpdateDormDTO) {
//     return this.repo.update(id, data);
//   }

//   async delete(id: string) {
//     return this.repo.delete(id);
//   }
// }

// lib/features/dorm/application/dorm.service.ts
import { CreateDormDTO, UpdateDormDTO } from "../domain/dorm.entity";

export class DormService {
  async create(data: CreateDormDTO) {
    const res = await fetch("/api/dorm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Gagal membuat dorm");
    return res.json();
  }

  async getAll() {
    const res = await fetch("/api/dorm", { cache: "no-store" });
    return res.json();
  }

  async getById(id: string) {
    const res = await fetch(`/api/dorm/${id}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Dorm tidak ditemukan");
    return res.json();
  }

  async update(id: string, data: UpdateDormDTO) {
    const res = await fetch(`/api/dorm/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  }

  async delete(id: string) {
    const res = await fetch(`/api/dorm/${id}`, { method: "DELETE" });
    return res.json();
  }
}

