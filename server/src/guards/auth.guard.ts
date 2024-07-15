import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();

    if (request.headers.auth) {
      try {
        await this.jwtService.verifyAsync(request.headers.auth as string);

        const user = await this.authService.findUserByToken(
          request.headers.auth,
        );

        if (user) {
          return true;
        }

        return false;
      } catch (err) {
        return false;
      }
    }

    return false;
  }
}
