import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthenticatedRequest } from '../interfaces/authenticated-request.interface';
import { AuthUser } from '../types/auth.types';

@Injectable()
export class OptionalJwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return true;
    }

    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException(
        'Authorization header must use Bearer token.',
      );
    }

    try {
      const payload = await this.jwtService.verifyAsync<AuthUser>(token);
      request.user = payload;
    } catch {
      throw new UnauthorizedException('Token is invalid or expired.');
    }

    return true;
  }
}
