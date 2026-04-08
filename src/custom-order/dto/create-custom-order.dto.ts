import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsOptional,
  Min,
  ValidateNested,
} from 'class-validator';
import { IsStringRecord } from '../../common/validators/is-string-record.decorator';
import { PersonalDetails } from '../types/custom-order.types';

export class CreateCustomOrderDto {
  @ApiProperty({
    type: 'object',
    additionalProperties: { type: 'string' },
    example: {
      instrumentType: 'electric-guitar',
      bodyMaterial: 'mahogany',
      finish: 'satin',
    },
  })
  @IsObject()
  @IsNotEmptyObject()
  @IsStringRecord()
  selections!: Record<string, string>;

  @ApiPropertyOptional({
    type: 'object',
    additionalProperties: { type: 'string' },
    example: {
      bodyMaterialComments: 'Prefer lightweight blank',
      finishStyleComments: 'Dark red burst',
    },
  })
  @IsOptional()
  @IsObject()
  @IsStringRecord()
  comments?: Record<string, string>;

  @ApiPropertyOptional({ example: 7340 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  estimatedTotalCost?: number;

  @ApiProperty({ type: () => PersonalDetails })
  @ValidateNested()
  @Type(() => PersonalDetails)
  personalDetails!: PersonalDetails;
}
