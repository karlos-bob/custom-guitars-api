import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateContactSubmissionDto {
  @ApiProperty({ example: 'Alex Panitka' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  name!: string;

  @ApiProperty({ example: 'alex@example.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: 'I would like to ask about lead times for a custom build.',
  })
  @IsString()
  @MinLength(10)
  @MaxLength(10000)
  message!: string;

  @ApiPropertyOptional({ example: 'Custom build timeline' })
  @IsOptional()
  @IsString()
  @MaxLength(300)
  subject?: string;

  @ApiPropertyOptional({ example: '+61 400 000 000' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  phone?: string;
}
