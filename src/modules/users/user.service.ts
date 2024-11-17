import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserRepository } from '@shared/repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private userRepo: UserRepository) {}

  create(dto: CreateUserDto) {
    return this.userRepo.create(dto);
  }

  async findAll() {
    return this.userRepo.findAll();
  }

  async findOne(userId: string) {
    await this.checkIfEntityExists(userId);

    return this.userRepo.findOne(userId);
  }

  async update(userId: string, dto: UpdatePasswordDto) {
    await this.checkIfEntityExists(userId);

    const user = await this.findOne(userId);

    const { newPassword, oldPassword } = dto;

    if (user.password !== oldPassword) {
      throw new ForbiddenException('Old password is not correct');
    }

    return this.userRepo.update(userId, newPassword);
  }

  async remove(userId: string) {
    await this.checkIfEntityExists(userId);

    await this.userRepo.remove(userId);
  }

  private async checkIfEntityExists(userId: string) {
    await this.userRepo.checkIfEntityExists(userId);
  }
}
