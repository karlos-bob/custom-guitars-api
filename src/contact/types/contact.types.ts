import { ApiProperty } from '@nestjs/swagger';

export class ContactSubmissionResponse {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
  id!: string;

  @ApiProperty({ example: 'Alex Panitka' })
  name!: string;

  @ApiProperty({ example: 'alex@example.com' })
  email!: string;

  @ApiProperty({ example: 'Hello, I have a question...' })
  message!: string;

  @ApiProperty({ example: 'Custom build', nullable: true })
  subject!: string | null;

  @ApiProperty({ example: '+61 400 000 000', nullable: true })
  phone!: string | null;

  @ApiProperty({ example: '2026-04-08T12:00:00.000Z' })
  createdAt!: string;
}
