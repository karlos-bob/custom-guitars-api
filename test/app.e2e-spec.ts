import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

interface AuthResponseBody {
  accessToken: string;
  user: {
    email: string;
    firstName: string;
  };
}

interface CustomOrderResponseBody {
  id: string;
  status: string;
  currency: string;
  selections: Record<string, string>;
}

interface StoredUser {
  id: string;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
}

interface StoredOrder {
  id: string;
  status: 'RECEIVED';
  currency: string;
  estimatedTotalCost: number;
  selections: Record<string, string>;
  comments: Record<string, string>;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  streetAddress: string;
  city: string;
  state: string;
  postCode: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string | null;
}

interface StoredContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  subject: string | null;
  phone: string | null;
  createdAt: Date;
}

interface StoredProduct {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  currency: string;
  estimatedTotalCost: number;
  selections: Record<string, string>;
  comments: Record<string, string>;
  bodyDesignId: string | null;
  modelKey: string | null;
  published: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

function createPrismaMock() {
  const users: StoredUser[] = [];
  const orders: StoredOrder[] = [];
  const contacts: StoredContactSubmission[] = [];
  const products: StoredProduct[] = [
    {
      id: 'a0000000-0000-4000-8000-000000000001',
      name: 'Orion Arcadia',
      slug: 'orion-arcadia',
      description: 'Demo product A',
      currency: 'AUD',
      estimatedTotalCost: 6500,
      selections: { instrumentType: 'electric-guitar' },
      comments: {},
      bodyDesignId: 'body-shape-orion',
      modelKey: 'arcadia',
      published: true,
      sortOrder: 0,
      createdAt: new Date('2026-04-08T00:00:00.000Z'),
      updatedAt: new Date('2026-04-08T00:00:00.000Z'),
    },
    {
      id: 'a0000000-0000-4000-8000-000000000002',
      name: 'Vela Revenant',
      slug: 'vela-revenant',
      description: 'Demo product B',
      currency: 'AUD',
      estimatedTotalCost: 7200,
      selections: { instrumentType: 'electric-guitar' },
      comments: {},
      bodyDesignId: 'body-shape-vela',
      modelKey: 'revenant',
      published: true,
      sortOrder: 1,
      createdAt: new Date('2026-04-08T00:00:00.000Z'),
      updatedAt: new Date('2026-04-08T00:00:00.000Z'),
    },
  ];

  return {
    user: {
      create: jest.fn(
        ({
          data,
        }: {
          data: Omit<StoredUser, 'id' | 'createdAt' | 'updatedAt'>;
        }) => {
          const now = new Date();
          const user: StoredUser = {
            id: `user-${users.length + 1}`,
            createdAt: now,
            updatedAt: now,
            ...data,
          };

          users.push(user);

          return Promise.resolve(user);
        },
      ),
      findUnique: jest.fn(
        ({ where }: { where: { id?: string; email?: string } }) =>
          Promise.resolve(
            users.find(
              (user) =>
                (where.id !== undefined && user.id === where.id) ||
                (where.email !== undefined && user.email === where.email),
            ) ?? null,
          ),
      ),
    },
    customOrder: {
      create: jest.fn(
        ({
          data,
        }: {
          data: Omit<StoredOrder, 'id' | 'status' | 'createdAt' | 'updatedAt'>;
        }) => {
          const now = new Date();
          const order: StoredOrder = {
            id: `order-${orders.length + 1}`,
            status: 'RECEIVED',
            createdAt: now,
            updatedAt: now,
            ...data,
          };

          orders.push(order);

          return Promise.resolve(order);
        },
      ),
      findUnique: jest.fn(({ where }: { where: { id: string } }) =>
        Promise.resolve(orders.find((order) => order.id === where.id) ?? null),
      ),
    },
    contactSubmission: {
      create: jest.fn(
        ({
          data,
        }: {
          data: Omit<StoredContactSubmission, 'id' | 'createdAt'>;
        }) => {
          const now = new Date();
          const row: StoredContactSubmission = {
            id: `contact-${contacts.length + 1}`,
            createdAt: now,
            ...data,
          };

          contacts.push(row);

          return Promise.resolve(row);
        },
      ),
    },
    product: {
      findMany: jest.fn(
        ({
          where,
          orderBy,
        }: {
          where: { published?: boolean };
          orderBy: Array<{ sortOrder?: 'asc' | 'desc'; name?: 'asc' | 'desc' }>;
        }) => {
          const list = products
            .filter((p) =>
              where?.published === false ? !p.published : p.published,
            )
            .sort((a, b) => {
              const primary = orderBy?.[0]?.sortOrder === 'desc' ? -1 : 1;
              if (a.sortOrder !== b.sortOrder) {
                return (a.sortOrder - b.sortOrder) * primary;
              }

              return a.name.localeCompare(b.name);
            });

          return Promise.resolve(
            list.map((p) => ({
              id: p.id,
              name: p.name,
              slug: p.slug,
              description: p.description,
              currency: p.currency,
              estimatedTotalCost: p.estimatedTotalCost,
              bodyDesignId: p.bodyDesignId,
              modelKey: p.modelKey,
            })),
          );
        },
      ),
      findFirst: jest.fn(
        ({
          where,
        }: {
          where: {
            published: boolean;
            slug?: string;
            OR?: Array<{ id?: string; slug?: string }>;
          };
        }) => {
          const list = products.filter((p) => p.published);

          if (where.slug) {
            return Promise.resolve(
              list.find((p) => p.slug === where.slug) ?? null,
            );
          }

          if (where.OR) {
            const match = list.find((p) =>
              where.OR!.some(
                (clause) =>
                  (clause.id !== undefined && p.id === clause.id) ||
                  (clause.slug !== undefined && p.slug === clause.slug),
              ),
            );

            return Promise.resolve(match ?? null);
          }

          return Promise.resolve(null);
        },
      ),
    },
  };
}

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const prismaMock = createPrismaMock();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaMock)
      .compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  it('/api (GET)', () => {
    return request(app.getHttpServer())
      .get('/api')
      .expect(200)
      .expect('Hello World!');
  });

  it('/api/custom-orders (POST) should validate payload', () => {
    return request(app.getHttpServer())
      .post('/api/custom-orders')
      .send({
        selections: {
          instrumentType: 'electric-guitar',
        },
        personalDetails: {
          firstName: 'Alex',
          lastName: 'Panitka',
          email: 'not-an-email',
          country: 'Australia',
          streetAddress: '123 Collins Street',
          city: 'Melbourne',
          state: 'Victoria',
          postCode: '3000',
        },
      })
      .expect(400);
  });

  it('/api/auth/sign-up and /api/auth/me should work', async () => {
    const signUpResponse = await request(app.getHttpServer())
      .post('/api/auth/sign-up')
      .send({
        firstName: 'Alex',
        lastName: 'Panitka',
        email: 'alex@example.com',
        password: 'StrongPassword123',
      })
      .expect(201);

    const body = signUpResponse.body as AuthResponseBody;

    expect(body.accessToken).toBeDefined();
    expect(body.user.email).toBe('alex@example.com');

    await request(app.getHttpServer())
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${body.accessToken}`)
      .expect(200)
      .expect(({ body }) => {
        expect(body as { email: string; firstName: string }).toEqual(
          expect.objectContaining({
            email: 'alex@example.com',
            firstName: 'Alex',
          }),
        );
      });
  });

  it('/api/auth/sign-in should reject invalid credentials', () => {
    return request(app.getHttpServer())
      .post('/api/auth/sign-in')
      .send({
        email: 'unknown@example.com',
        password: 'StrongPassword123',
      })
      .expect(401);
  });

  it('/api/custom-orders should create and return persisted order', async () => {
    const signUpResponse = await request(app.getHttpServer())
      .post('/api/auth/sign-up')
      .send({
        firstName: 'Alex',
        lastName: 'Panitka',
        email: 'alex@example.com',
        password: 'StrongPassword123',
      })
      .expect(201);

    const authBody = signUpResponse.body as AuthResponseBody;

    const createOrderResponse = await request(app.getHttpServer())
      .post('/api/custom-orders')
      .set('Authorization', `Bearer ${authBody.accessToken}`)
      .send({
        selections: {
          instrumentType: 'electric-guitar',
          finish: 'satin',
        },
        comments: {
          finishStyleComments: 'Dark burst',
        },
        personalDetails: {
          firstName: 'Alex',
          lastName: 'Panitka',
          email: 'alex@example.com',
          country: 'Australia',
          streetAddress: '123 Collins Street',
          city: 'Melbourne',
          state: 'Victoria',
          postCode: '3000',
        },
      })
      .expect(201);

    const orderBody = createOrderResponse.body as CustomOrderResponseBody;

    expect(orderBody.id).toBeDefined();
    expect(orderBody.status).toBe('received');

    await request(app.getHttpServer())
      .get(`/api/custom-orders/${orderBody.id}`)
      .expect(200)
      .expect(({ body }) => {
        expect(body).toEqual(
          expect.objectContaining({
            id: orderBody.id,
            currency: 'AUD',
            selections: expect.objectContaining({
              instrumentType: 'electric-guitar',
            }),
          }),
        );
      });
  });

  it('/api/contact should accept contact submission', () => {
    return request(app.getHttpServer())
      .post('/api/contact')
      .send({
        name: 'Alex Panitka',
        email: 'alex@example.com',
        message: 'Hello, I would like to know more about your builds.',
        subject: 'Question',
        phone: '+61 400 000 000',
      })
      .expect(201)
      .expect(({ body }) => {
        expect(body as { id: string; email: string }).toEqual(
          expect.objectContaining({
            email: 'alex@example.com',
            name: 'Alex Panitka',
          }),
        );
      });
  });

  it('/api/products should return catalog list', () => {
    return request(app.getHttpServer())
      .get('/api/products')
      .expect(200)
      .expect(({ body }) => {
        expect(Array.isArray(body)).toBe(true);
        expect(body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({ slug: 'orion-arcadia' }),
            expect.objectContaining({ slug: 'vela-revenant' }),
          ]),
        );
      });
  });

  it('/api/products/:slug should return full product spec', () => {
    return request(app.getHttpServer())
      .get('/api/products/orion-arcadia')
      .expect(200)
      .expect(({ body }) => {
        expect(
          body as { slug: string; selections: Record<string, string> },
        ).toEqual(
          expect.objectContaining({
            slug: 'orion-arcadia',
            currency: 'AUD',
            selections: expect.objectContaining({
              instrumentType: 'electric-guitar',
            }),
          }),
        );
      });
  });

  afterEach(async () => {
    await app.close();
  });
});
