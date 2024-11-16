import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@shared/database/entities';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  async findOne(id: string): Promise<User> {
    return this.repository.findOne({ where: { id } });
  }

  async findAll(): Promise<User[]> {
    return this.repository.find();
  }

  async create(dto: DeepPartial<User>): Promise<User> {
    const newUser = await this.repository.create(dto);

    await this.repository.insert(newUser);

    return this.findOne(newUser.id);
  }

  async update(id: string, password: string): Promise<User> {
    await this.repository.update(id, { password });

    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async checkIfUserExists(id: string): Promise<void> {
    const isUserExists = await this.repository.exists({
      where: { id },
    });

    if (!isUserExists) {
      throw new NotFoundException();
    }
  }
}
