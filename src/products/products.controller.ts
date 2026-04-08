import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { GuitarProduct, GuitarProductSummary } from './types/product.types';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({ summary: 'List published guitar products (catalog)' })
  @ApiOkResponse({ type: [GuitarProductSummary] })
  @Get()
  findAll(): Promise<GuitarProductSummary[]> {
    return this.productsService.findAllPublished();
  }

  @ApiOperation({
    summary: 'Get one product by UUID or slug (full spec, no user data)',
  })
  @ApiParam({
    name: 'identifier',
    description: 'Product id (UUID) or slug',
    example: 'orion-arcadia',
  })
  @ApiOkResponse({ type: GuitarProduct })
  @Get(':identifier')
  findOne(@Param('identifier') identifier: string): Promise<GuitarProduct> {
    return this.productsService.findOnePublished(identifier);
  }
}
