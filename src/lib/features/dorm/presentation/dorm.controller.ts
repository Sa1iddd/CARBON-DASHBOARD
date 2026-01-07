// lib/features/dorm/presentation/dorm.controller.ts

import { DormService } from "../application/dorm.service";
import { CreateDormDTO, UpdateDormDTO } from "../domain/dorm.entity";

export default class DormController {
  private service: DormService;

  constructor() {
    this.service = new DormService();
  }


  async create(data: CreateDormDTO) {
    return this.service.create(data);
  }

  async getAll() {
    return this.service.getAll();
  }

  async getById(id: string) {
    return this.service.getById(id);
  }

  async update(id: string, data: UpdateDormDTO) {
    return this.service.update(id, data);
  }

  async delete(id: string) {
    return this.service.delete(id);
  }
}
