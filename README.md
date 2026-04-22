# Case Couture Monorepo

Early-stage monorepo for a custom phone-case storefront. The repo is split into `frontend/`, `backend/`, and shared `packages/`, so app code and reusable contracts each have a clear home.

## Recommended backend stack

This repo is set up around the direction you described:

- PostgreSQL for relational e-commerce data and transactional safety
- Prisma for schema management and type-safe database access
- Hono for a standalone TypeScript API inside the monorepo
- npm workspaces to keep frontend and backend in one repository with clear boundaries

## Workspace layout

```text
frontend/
  package.json
  apps/
    web/      Next.js frontend
backend/
  package.json
  apps/
    api/      Hono backend API
packages/
  db/         Prisma schema and shared database client
  types/      Shared strict TypeScript DTOs
  ui/         Shared UI package
root files/
  docker-compose.yml
  tsconfig.base.json
  .env.example
```

## Local development

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
cp .env.example .env
```

3. Start PostgreSQL with Docker:

```bash
docker compose up -d
```

4. Generate the Prisma client and apply your schema:

```bash
npm run db:generate
npm run db:migrate
```

5. Run the backend:

```bash
npm run dev:api
```

6. Run the frontend in another terminal:

```bash
npm run dev:web
```

Frontend: `http://localhost:3000`  
Backend health check: `http://localhost:3001/health`

## Current backend focus

The initial schema is aimed at your core commerce domain:

- `Product`
- `ProductVariant`
- `InventoryItem`
- `Order`
- `OrderItem`
- `Customer`
- `Address`

That gives you a stable foundation for:

- inventory-safe checkout logic
- device/model-specific case variants
- order history and fulfillment
- adding a CMS/admin layer later without redoing the data model

## Why this setup fits your team

- Your frontend colleague can keep working in `frontend/apps/web`.
- You can own `backend/apps/api` and `packages/db` without stepping on frontend files.
- Shared DTOs now live in `packages/types`, so frontend and backend can import the same strict contracts.
- If you later add a CMS, it can sit on top of the same PostgreSQL schema instead of becoming the source of truth.
