import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignUpDto {
  @ApiProperty({ example: 'Alex' })
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @ApiProperty({ example: 'Panitka' })
  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @ApiProperty({ example: 'alex@example.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'StrongPassword123' })
  @IsString()
  @MinLength(8)
  password!: string;
}
