import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '@modules/users/user.service';
import { CreateUserDto } from '@modules/users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from '@core/interfaces/jwt-payload.interface';
import { IRefreshTokenPayload } from '@core/interfaces';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signup(dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  async login(dto: CreateUserDto) {
    const user = await this.userService.findOne({ login: dto.login });

    if (!user) {
      throw new ForbiddenException();
    }

    const isPasswordMatch = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordMatch) {
      throw new ForbiddenException();
    }

    const tokenPayload: IJwtPayload = { userId: user.id, login: user.login };

    const [accessToken, refreshToken] = await Promise.all([
      this.createAccessToken(tokenPayload),
      this.createRefreshToken(tokenPayload),
    ]);

    return { accessToken, refreshToken };
  }

  async refresh(dto: IRefreshTokenPayload) {
    if (!dto.refreshToken) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(dto.refreshToken, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
        ignoreExpiration: false,
      });

      const { userId, login } = payload;

      const [accessToken, refreshToken] = await Promise.all([
        this.createAccessToken({ userId, login }),
        this.createRefreshToken({ userId, login }),
      ]);

      return { accessToken, refreshToken };
    } catch {
      throw new ForbiddenException();
    }
  }

  async createAccessToken(payload: IJwtPayload) {
    return this.jwtService.signAsync(payload, {
      expiresIn: process.env.TOKEN_EXPIRE_TIME,
      secret: process.env.JWT_SECRET_KEY,
    });
  }

  async createRefreshToken(payload: IJwtPayload) {
    return this.jwtService.signAsync(payload, {
      expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
      secret: process.env.JWT_SECRET_REFRESH_KEY,
    });
  }
}
