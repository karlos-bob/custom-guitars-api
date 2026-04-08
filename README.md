# Custom Guitars API

A [NestJS](https://nestjs.com/) backend for a custom electric guitar shop: order builder configuration, catalog of pre-defined guitar specs, contact form, and user authentication.

**API base URL:** `http://localhost:3000/api` (port is set via the `PORT` environment variable).

**OpenAPI (Swagger UI):** `http://localhost:3000/docs`

## Stack

- **Node.js** + **TypeScript**
- **PostgreSQL** + **Prisma ORM** (config in `prisma.config.ts`, schema in `prisma/schema.prisma`)
- **JWT** (`@nestjs/jwt`), passwords hashed with **bcryptjs**
- Request validation: **class-validator** + global `ValidationPipe`
- **Swagger** (`@nestjs/swagger`)

## Prerequisites

- Node.js (LTS recommended)
- Package manager: `npm`, `pnpm`, or `yarn`
- **PostgreSQL** — local install or Docker (see `docker-compose.yml`)

## Quick start

### 1. Install dependencies

```bash
npm install
# or: pnpm install
```

### 2. Environment variables

Copy the example file and adjust values:

```bash
cp .env.example .env
```

Set at least:

- `DATABASE_URL` — PostgreSQL connection string
- `JWT_SECRET` — secret for signing JWTs (use a long random string in production)

The `.env` file is not committed to the repository.

### 3. Database

**Option A — Docker** (requires Docker installed):

```bash
npm run db:up
```

**Option B** — your own PostgreSQL instance: create a database and set `DATABASE_URL` in `.env`.

### 4. Migrations and Prisma Client

```bash
npm run prisma:migrate:dev
npm run prisma:generate
```

### 5. Development server

```bash
npm run start:dev
```

The app listens on `PORT` from `.env` (defaults to `3000`).

## Main endpoints (prefix `/api`)

| Area | Description |
|------|-------------|
| **Auth** | `POST /auth/sign-up`, `POST /auth/sign-in`, `GET /auth/me` (Bearer JWT) |
| **Custom orders** | `GET /custom-orders/config`, `POST /custom-orders`, `GET /custom-orders/:id` (optional Bearer token to attach the order to a user) |
| **Contact** | `POST /contact` — contact form submission |
| **Products** | `GET /products` — catalog list; `GET /products/:identifier` — detail by UUID or `slug` |

The root route `GET /api` returns a hello response from the default `AppController` (health-style check).

## Useful scripts

| Command | Purpose |
|---------|---------|
| `npm run build` | Production build |
| `npm run start:dev` | Development with watch |
| `npm run start:prod` | Run compiled `dist/main` |
| `npm run lint` | ESLint |
| `npm run test` | Unit tests |
| `npm run test:e2e` | E2E tests |
| `npm run prisma:studio` | Prisma Studio (browse DB data) |
| `npm run db:up` / `npm run db:down` | Start/stop Postgres via Docker Compose |

## Project layout (overview)

- `src/auth/` — sign-up, sign-in, JWT, guards
- `src/custom-order/` — builder config (mock), create and read orders
- `src/contact/` — contact form submissions
- `src/products/` — guitar catalog (spec without personal data)
- `src/prisma/` — `PrismaService` and database access
- `prisma/migrations/` — SQL migrations

## License

UNLICENSED (private project).
