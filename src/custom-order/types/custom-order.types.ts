import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export type CustomOrderFieldType = 'select' | 'text' | 'email';

export class SelectOption {
  @ApiProperty({ example: 'arcadia' })
  value!: string;

  @ApiProperty({ example: 'Arcadia' })
  label!: string;

  @ApiProperty({ example: 250 })
  priceDelta!: number;
}

export class BuilderField {
  @ApiProperty({ example: 'instrumentType' })
  key!: string;

  @ApiProperty({ example: 'Instrument Type' })
  label!: string;

  @ApiProperty({ enum: ['select', 'text', 'email'], example: 'select' })
  type!: CustomOrderFieldType;

  @ApiPropertyOptional({ example: 'Choose an option' })
  placeholder?: string;

  @ApiPropertyOptional({ example: true })
  required?: boolean;

  @ApiPropertyOptional({ type: () => [SelectOption] })
  options?: SelectOption[];
}

export class BuilderSection {
  @ApiProperty({ example: 'instrument' })
  key!: string;

  @ApiProperty({ example: 'Body Design & Core Build' })
  title!: string;

  @ApiProperty({ example: 'Choose your base instrument options.' })
  subtitle!: string;

  @ApiProperty({ example: 2450 })
  totalEstimateCost!: number;

  @ApiProperty({ type: () => [BuilderField] })
  fields!: BuilderField[];
}

export class BodyDesign {
  @ApiProperty({ example: 'body-shape-orion' })
  id!: string;

  @ApiProperty({ example: 'Orion' })
  name!: string;

  @ApiProperty({ example: 'Arcadia' })
  model!: string;

  @ApiProperty({
    example: 'Balanced double-cut shape for versatile modern builds.',
  })
  description!: string;
}

export class CustomOrderBuilderConfig {
  @ApiProperty({ example: 'AUD' })
  currency!: string;

  @ApiProperty({ example: 7340 })
  totalEstimateCost!: number;

  @ApiProperty({ type: () => [BodyDesign] })
  bodyDesigns!: BodyDesign[];

  @ApiProperty({ type: () => [SelectOption] })
  modelOptions!: SelectOption[];

  @ApiProperty({ type: () => [BuilderSection] })
  sections!: BuilderSection[];
}

export class PersonalDetails {
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

  @ApiProperty({ example: 'Australia' })
  @IsString()
  @IsNotEmpty()
  country!: string;

  @ApiProperty({ example: '123 Collins Street' })
  @IsString()
  @IsNotEmpty()
  streetAddress!: string;

  @ApiProperty({ example: 'Melbourne' })
  @IsString()
  @IsNotEmpty()
  city!: string;

  @ApiProperty({ example: 'Victoria' })
  @IsString()
  @IsNotEmpty()
  state!: string;

  @ApiProperty({ example: '3000' })
  @IsString()
  @IsNotEmpty()
  postCode!: string;
}

export class SubmittedCustomOrder {
  @ApiProperty({
    example: 'c4f5212c-daa0-4342-94c2-3fa4eb72d759',
  })
  id!: string;

  @ApiProperty({ enum: ['received'], example: 'received' })
  status!: 'received';

  @ApiProperty({ example: '2026-04-08T09:30:00.000Z' })
  createdAt!: string;

  @ApiProperty({ example: 7340 })
  estimatedTotalCost!: number;

  @ApiProperty({ example: 'AUD' })
  currency!: string;

  @ApiProperty({
    type: 'object',
    additionalProperties: { type: 'string' },
    example: {
      instrumentType: 'electric-guitar',
      bridge: 'evertune',
    },
  })
  selections!: Record<string, string>;

  @ApiProperty({
    type: 'object',
    additionalProperties: { type: 'string' },
    example: {
      finishStyleComments: 'Transparent black burst',
    },
  })
  comments!: Record<string, string>;

  @ApiProperty({ type: () => PersonalDetails })
  personalDetails!: PersonalDetails;
}
