import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserService } from '@modules/users/user.service';
import { IJwtPayload } from '@core/interfaces';
import { User } from '@shared/database/entities';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const excludedRoutes = [
      '/auth/signup',
      '/auth/login',
      '/auth/refresh',
      '/doc',
      '/',
    ];

    if (excludedRoutes.includes(request.route.path)) {
      return true;
    }

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload: IJwtPayload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET_KEY,
        ignoreExpiration: false,
      });

      const user = await this.userService.findOne({ id: payload.userId });

      this.checkUser(user);
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private checkUser(user: User) {
    if (!user) throw new Error('User not found');
  }
}
