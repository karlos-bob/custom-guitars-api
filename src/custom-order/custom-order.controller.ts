import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { OptionalJwtAuthGuard } from '../auth/guards/optional-jwt-auth.guard';
import type { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';
import { CreateCustomOrderDto } from './dto/create-custom-order.dto';
import { CustomOrderService } from './custom-order.service';
import {
  CustomOrderBuilderConfig,
  SubmittedCustomOrder,
} from './types/custom-order.types';

@ApiTags('custom-orders')
@Controller('custom-orders')
export class CustomOrderController {
  constructor(private readonly customOrderService: CustomOrderService) {}

  @ApiOperation({ summary: 'Get custom guitar builder configuration' })
  @ApiOkResponse({ type: CustomOrderBuilderConfig })
  @Get('config')
  getBuilderConfig(): CustomOrderBuilderConfig {
    return this.customOrderService.getBuilderConfig();
  }

  @ApiOperation({ summary: 'Create a custom guitar order' })
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: SubmittedCustomOrder })
  @UseGuards(OptionalJwtAuthGuard)
  @Post()
  async create(
    @Body() dto: CreateCustomOrderDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<SubmittedCustomOrder> {
    return this.customOrderService.create(dto, req.user?.id);
  }

  @ApiOperation({ summary: 'Get a custom guitar order by id' })
  @ApiParam({ name: 'id', example: 'c4f5212c-daa0-4342-94c2-3fa4eb72d759' })
  @ApiOkResponse({ type: SubmittedCustomOrder })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<SubmittedCustomOrder> {
    return this.customOrderService.findOne(id);
  }
}
