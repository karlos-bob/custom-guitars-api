import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ContactService } from './contact.service';
import { CreateContactSubmissionDto } from './dto/create-contact-submission.dto';
import { ContactSubmissionResponse } from './types/contact.types';

@ApiTags('contact')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @ApiOperation({ summary: 'Submit a contact form (Contact me)' })
  @ApiCreatedResponse({ type: ContactSubmissionResponse })
  @Post()
  async create(
    @Body() dto: CreateContactSubmissionDto,
  ): Promise<ContactSubmissionResponse> {
    return this.contactService.create(dto);
  }
}
