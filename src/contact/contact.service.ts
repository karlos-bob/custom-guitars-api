import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContactSubmissionDto } from './dto/create-contact-submission.dto';
import { ContactSubmissionResponse } from './types/contact.types';

@Injectable()
export class ContactService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    dto: CreateContactSubmissionDto,
  ): Promise<ContactSubmissionResponse> {
    const row = await this.prisma.contactSubmission.create({
      data: {
        name: dto.name.trim(),
        email: dto.email.trim().toLowerCase(),
        message: dto.message.trim(),
        subject: dto.subject?.trim() || null,
        phone: dto.phone?.trim() || null,
      },
    });

    return this.toResponse(row);
  }

  private toResponse(row: {
    id: string;
    name: string;
    email: string;
    message: string;
    subject: string | null;
    phone: string | null;
    createdAt: Date;
  }): ContactSubmissionResponse {
    return {
      id: row.id,
      name: row.name,
      email: row.email,
      message: row.message,
      subject: row.subject,
      phone: row.phone,
      createdAt: row.createdAt.toISOString(),
    };
  }
}
