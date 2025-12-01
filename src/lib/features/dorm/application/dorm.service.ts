// lib/features/dorm/application/dorm.service.ts

import {
  CreateDormDTO,
  UpdateDormDTO,
} from "../domain/dorm.entity";
import { DormRepository } from "../infrastructure/dorm.repository";

export class DormService {
  private repo: DormRepository;

  constructor() {
    this.repo = new DormRepository();
  }

  async create(data: CreateDormDTO) {
    return this.repo.create(data);
  }

  async getAll() {
    return this.repo.findAll();
  }

  async getById(id: string) {
    const dorm = await this.repo.findById(id);
    if (!dorm) throw new Error("Asrama tidak ditemukan");
    return dorm;
  }

  async update(id: string, data: UpdateDormDTO) {
    return this.repo.update(id, data);
  }

  async delete(id: string) {
    return this.repo.delete(id);
  }
}
