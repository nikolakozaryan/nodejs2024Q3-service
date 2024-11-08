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

  findAll() {
    return this.userRepo.findAll();
  }

  findOne(userId: string) {
    this.checkIfUserExists(userId);

    return this.userRepo.findOne(userId);
  }

  update(userId: string, dto: UpdatePasswordDto) {
    this.checkIfUserExists(userId);

    const user = this.findOne(userId);

    const { newPassword, oldPassword } = dto;

    if (user.password !== oldPassword) {
      throw new ForbiddenException('Old password is not correct');
    }

    return this.userRepo.update(userId, newPassword);
  }

  remove(userId: string) {
    this.checkIfUserExists(userId);

    this.userRepo.remove(userId);
  }

  private checkIfUserExists(userId: string) {
    this.userRepo.checkIfUserExists(userId);
  }
}
