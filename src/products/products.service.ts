import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { GuitarProduct, GuitarProductSummary } from './types/product.types';

function looksLikeUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
    value,
  );
}

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllPublished(): Promise<GuitarProductSummary[]> {
    const rows = await this.prisma.product.findMany({
      where: { published: true },
      orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        currency: true,
        estimatedTotalCost: true,
        bodyDesignId: true,
        modelKey: true,
      },
    });

    return rows;
  }

  async findOnePublished(identifier: string): Promise<GuitarProduct> {
    const row = await this.prisma.product.findFirst({
      where: {
        published: true,
        ...(looksLikeUuid(identifier)
          ? { OR: [{ id: identifier }, { slug: identifier }] }
          : { slug: identifier }),
      },
    });

    if (!row) {
      throw new NotFoundException(
        `Product "${identifier}" was not found or is not published.`,
      );
    }

    return this.toGuitarProduct(row);
  }

  private toGuitarProduct(row: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    currency: string;
    estimatedTotalCost: number;
    selections: Prisma.JsonValue;
    comments: Prisma.JsonValue;
    bodyDesignId: string | null;
    modelKey: string | null;
    createdAt: Date;
    updatedAt: Date;
  }): GuitarProduct {
    return {
      id: row.id,
      name: row.name,
      slug: row.slug,
      description: row.description,
      currency: row.currency,
      estimatedTotalCost: row.estimatedTotalCost,
      bodyDesignId: row.bodyDesignId,
      modelKey: row.modelKey,
      selections: this.toStringRecord(row.selections),
      comments: this.toStringRecord(row.comments),
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
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
