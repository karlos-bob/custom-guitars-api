import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { AuthTokenResponse, AuthUser } from './types/auth.types';

@Injectable()
export class AuthService {
  private readonly jwtExpiresInSeconds = 60 * 60 * 24 * 7;

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(dto: SignUpDto): Promise<AuthTokenResponse> {
    const normalizedEmail = dto.email.trim().toLowerCase();
    const passwordHash = await hash(dto.password, 10);
    try {
      const user = await this.prisma.user.create({
        data: {
          email: normalizedEmail,
          firstName: dto.firstName.trim(),
          lastName: dto.lastName.trim(),
          passwordHash,
        },
      });

      return this.buildAuthResponse(user);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('User with this email already exists.');
      }

      throw error;
    }
  }

  async signIn(dto: SignInDto): Promise<AuthTokenResponse> {
    const normalizedEmail = dto.email.trim().toLowerCase();
    const user = await this.prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const isPasswordValid = await compare(dto.password, user.passwordHash);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    return this.buildAuthResponse(user);
  }

  async getProfile(userId: string): Promise<AuthUser> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthorizedException('User was not found for this token.');
    }

    return this.toAuthUser(user);
  }

  private buildAuthResponse(user: User): AuthTokenResponse {
    const authUser = this.toAuthUser(user);
    const accessToken = this.jwtService.sign(authUser);

    return {
      accessToken,
      tokenType: 'Bearer',
      expiresIn: this.jwtExpiresInSeconds,
      user: authUser,
    };
  }

  private toAuthUser(
    user: Pick<User, 'id' | 'email' | 'firstName' | 'lastName' | 'createdAt'>,
  ): AuthUser {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: user.createdAt.toISOString(),
    };
  }
}
