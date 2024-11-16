import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserRepository } from '@shared/repositories/user.repository';
import { User } from '@shared/database/entities';

@Injectable()
export class UserService {
  constructor(private userRepo: UserRepository) {}

  create(dto: CreateUserDto) {
    const { login, password } = dto;

    const entity = new User(login, password);

    return this.userRepo.create(entity);
  }

  async findAll() {
    return this.userRepo.findAll();
  }

  async findOne(userId: string) {
    await this.checkIfUserExists(userId);

    return this.userRepo.findOne(userId);
  }

  async update(userId: string, dto: UpdatePasswordDto) {
    await this.checkIfUserExists(userId);

    const user = await this.findOne(userId);

    const { newPassword, oldPassword } = dto;

    if (user.password !== oldPassword) {
      throw new ForbiddenException('Old password is not correct');
    }

    return this.userRepo.update(userId, newPassword);
  }

  async remove(userId: string) {
    await this.checkIfUserExists(userId);

    await this.userRepo.remove(userId);
  }

  private async checkIfUserExists(userId: string) {
    await this.userRepo.checkIfUserExists(userId);
  }
}
