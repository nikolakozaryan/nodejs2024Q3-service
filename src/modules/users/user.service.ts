import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserRepository } from '@shared/repositories/user.repository';
import { User } from '@shared/database/entities';
import { FindManyOptions, FindOptionsWhere } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private userRepo: UserRepository) {}

  create(dto: CreateUserDto) {
    return this.userRepo.create(dto);
  }

  async findAll() {
    return this.userRepo.findAll();
  }

  async findOne(where: FindOptionsWhere<User>) {
    await this.checkIfEntityExists({ where });

    return this.userRepo.findOne(where);
  }

  async update(userId: string, dto: UpdatePasswordDto) {
    await this.checkIfEntityExists({ where: { id: userId } });

    const user = await this.findOne({ id: userId });

    const { newPassword, oldPassword } = dto;

    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordMatch) {
      throw new ForbiddenException('Old password is not correct');
    }

    return this.userRepo.update(userId, newPassword);
  }

  async remove(userId: string) {
    await this.checkIfEntityExists({ where: { id: userId } });

    await this.userRepo.remove(userId);
  }

  private async checkIfEntityExists(options: FindManyOptions<User>) {
    await this.userRepo.checkIfEntityExists(options);
  }
}
