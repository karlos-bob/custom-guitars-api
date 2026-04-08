import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/** Short card for catalog / list endpoints */
export class GuitarProductSummary {
  @ApiProperty({ example: 'a0000000-0000-4000-8000-000000000001' })
  id!: string;

  @ApiProperty({ example: 'Orion Arcadia' })
  name!: string;

  @ApiProperty({ example: 'orion-arcadia' })
  slug!: string;

  @ApiPropertyOptional({
    example: 'Balanced double-cut, versatile modern build.',
  })
  description!: string | null;

  @ApiProperty({ example: 'AUD' })
  currency!: string;

  @ApiProperty({ example: 6500 })
  estimatedTotalCost!: number;

  @ApiPropertyOptional({ example: 'body-shape-orion' })
  bodyDesignId!: string | null;

  @ApiPropertyOptional({ example: 'arcadia' })
  modelKey!: string | null;
}

/**
 * Full guitar spec: mirrors custom-order payload (selections + comments + totals)
 * without personal / user details.
 */
export class GuitarProduct extends GuitarProductSummary {
  @ApiProperty({
    type: 'object',
    additionalProperties: { type: 'string' },
    example: { instrumentType: 'electric-guitar', bridge: 'evertune' },
  })
  selections!: Record<string, string>;

  @ApiProperty({
    type: 'object',
    additionalProperties: { type: 'string' },
    example: { finishStyleComments: 'Transparent black burst' },
  })
  comments!: Record<string, string>;

  @ApiProperty({ example: '2026-04-08T09:30:00.000Z' })
  createdAt!: string;

  @ApiProperty({ example: '2026-04-08T09:30:00.000Z' })
  updatedAt!: string;
}
