import { Injectable } from '@nestjs/common';
import { UserService } from '@modules/users/user.service';
import { CreateUserDto } from '@modules/users/dto/create-user.dto';
import { RefreshTokenDto } from '@modules/auth/dto/refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signup(dto: CreateUserDto) {}

  async login(dto: CreateUserDto) {}

  async refresh(dto: RefreshTokenDto) {}
}
