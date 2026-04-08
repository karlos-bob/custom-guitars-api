import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { AuthService } from './auth.service';
import { AuthTokenResponse, AuthUser } from './types/auth.types';
import type { AuthenticatedRequest } from './interfaces/authenticated-request.interface';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Register a new user' })
  @ApiCreatedResponse({ type: AuthTokenResponse })
  @ApiConflictResponse({ description: 'Email is already registered.' })
  @Post('sign-up')
  async signUp(@Body() dto: SignUpDto): Promise<AuthTokenResponse> {
    return this.authService.signUp(dto);
  }

  @ApiOperation({ summary: 'Sign in with email and password' })
  @ApiOkResponse({ type: AuthTokenResponse })
  @ApiUnauthorizedResponse({ description: 'Invalid email or password.' })
  @HttpCode(200)
  @Post('sign-in')
  async signIn(@Body() dto: SignInDto): Promise<AuthTokenResponse> {
    return this.authService.signIn(dto);
  }

  @ApiOperation({ summary: 'Get current authenticated user' })
  @ApiBearerAuth()
  @ApiOkResponse({ type: AuthUser })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid bearer token.' })
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@Req() req: AuthenticatedRequest): Promise<AuthUser> {
    return this.authService.getProfile(req.user.id);
  }
}
