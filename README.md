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
    cms/      Directus CMS
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

2. Copy backend environment variables:

```bash
cp backend/.env.example backend/.env
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

6. Seed sample catalog data:

```bash
curl -X POST http://localhost:3001/api/dev/seed
```

7. Run the frontend in another terminal:

```bash
npm run dev:web
```

Frontend: `http://localhost:3000`  
Backend health check: `http://localhost:3001/health`
Catalog list: `http://localhost:3001/api/v1/products`
Product detail: `http://localhost:3001/api/v1/products/butter-kiss-case`

Backend secrets such as `DATABASE_URL` and any Supabase admin keys belong in `backend/.env`, not in the frontend.
`FRONTEND_ORIGIN` controls which local frontend is allowed to call the API from the browser.
For local development, `backend/.env.example` points `DATABASE_URL` at the Docker Postgres container.
If you want to use Supabase instead, replace `DATABASE_URL` in `backend/.env` with the connection string from your Supabase project settings.

## Directus CMS

The repo also supports a self-hosted Directus app in `backend/apps/cms`.

1. Copy the CMS environment file:

```bash
cp backend/apps/cms/.env.example backend/apps/cms/.env
```

2. Install dependencies:

```bash
npm install
```

3. Bootstrap Directus:

```bash
npm run cms:bootstrap
```

4. Start the CMS:

```bash
npm run dev:cms
```

Directus will be available at `http://localhost:8055`.

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

