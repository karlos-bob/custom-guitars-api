import { ApiProperty } from '@nestjs/swagger';

export class AuthUser {
  @ApiProperty({
    example: 'd4e4a0ef-a7f8-4719-8646-44d6aa7c5c76',
  })
  id!: string;

  @ApiProperty({ example: 'alex@example.com' })
  email!: string;

  @ApiProperty({ example: 'Alex' })
  firstName!: string;

  @ApiProperty({ example: 'Panitka' })
  lastName!: string;

  @ApiProperty({ example: '2026-04-08T10:00:00.000Z' })
  createdAt!: string;
}

export class AuthTokenResponse {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  accessToken!: string;

  @ApiProperty({ example: 'Bearer' })
  tokenType!: 'Bearer';

  @ApiProperty({ example: 604800 })
  expiresIn!: number;

  @ApiProperty({ type: () => AuthUser })
  user!: AuthUser;
}
