import { Injectable, NotFoundException } from '@nestjs/common';
import { CustomOrder, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { customOrderBuilderConfig } from './data/custom-order-config.mock';
import { CreateCustomOrderDto } from './dto/create-custom-order.dto';
import {
  CustomOrderBuilderConfig,
  SubmittedCustomOrder,
} from './types/custom-order.types';

@Injectable()
export class CustomOrderService {
  constructor(private readonly prisma: PrismaService) {}

  getBuilderConfig(): CustomOrderBuilderConfig {
    return customOrderBuilderConfig;
  }

  async create(
    dto: CreateCustomOrderDto,
    userId?: string,
  ): Promise<SubmittedCustomOrder> {
    const order = await this.prisma.customOrder.create({
      data: {
        currency: customOrderBuilderConfig.currency,
        estimatedTotalCost:
          dto.estimatedTotalCost ?? customOrderBuilderConfig.totalEstimateCost,
        selections: dto.selections as Prisma.InputJsonValue,
        comments: (dto.comments ?? {}) as Prisma.InputJsonValue,
        firstName: dto.personalDetails.firstName,
        lastName: dto.personalDetails.lastName,
        email: dto.personalDetails.email,
        country: dto.personalDetails.country,
        streetAddress: dto.personalDetails.streetAddress,
        city: dto.personalDetails.city,
        state: dto.personalDetails.state,
        postCode: dto.personalDetails.postCode,
        userId,
      },
    });

    return this.toSubmittedCustomOrder(order);
  }

  async findOne(id: string): Promise<SubmittedCustomOrder> {
    const order = await this.prisma.customOrder.findUnique({
      where: { id },
    });

    if (!order) {
      throw new NotFoundException(
        `Custom order with id "${id}" was not found.`,
      );
    }

    return this.toSubmittedCustomOrder(order);
  }

  private toSubmittedCustomOrder(order: CustomOrder): SubmittedCustomOrder {
    return {
      id: order.id,
      status: order.status.toLowerCase() as SubmittedCustomOrder['status'],
      createdAt: order.createdAt.toISOString(),
      estimatedTotalCost: order.estimatedTotalCost,
      currency: order.currency,
      selections: this.toStringRecord(order.selections),
      comments: this.toStringRecord(order.comments),
      personalDetails: {
        firstName: order.firstName,
        lastName: order.lastName,
        email: order.email,
        country: order.country,
        streetAddress: order.streetAddress,
        city: order.city,
        state: order.state,
        postCode: order.postCode,
      },
    };
  }

  private toStringRecord(value: Prisma.JsonValue): Record<string, string> {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      return {};
    }

    return Object.fromEntries(
      Object.entries(value).filter(
        (entry): entry is [string, string] => typeof entry[1] === 'string',
      ),
    );
  }
}
