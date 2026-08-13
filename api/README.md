# RSS2LMS API

This service provides the backend layer for the RSS2LMS application. It exposes REST endpoints for feeds, health monitoring, and request statistics, and persists feed data using Prisma and PostgreSQL.

## Features

- Prisma schema for authors and feed entries
- CRUD endpoints for RSS content management
- Healthcheck endpoint at `/api/health`
- Request counter at `/api/count`
- Seed data for demonstration feeds
- Docker-ready startup flow

## Tech Stack

- Next.js 16
- Prisma ORM
- PostgreSQL
- TypeScript

## Database Setup

Set the environment variable before starting the app:

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
```

Generate the Prisma client and sync the database:

```bash
npx prisma generate
npx prisma db push
```

## Run locally

```bash
npm install
npm run dev -- --hostname 0.0.0.0
```

The API listens on port 3000 by default.

## API routes

- `GET /api/feeds` - list feeds
- `POST /api/feeds` - create feed
- `GET /api/feeds/[id]` - fetch one feed
- `PUT /api/feeds/[id]` - update one feed
- `DELETE /api/feeds/[id]` - delete one feed
- `GET /api/health` - database health and usage status
- `GET /api/count` - total request count

## Docker

This project is designed to run with the root Docker Compose configuration in the repository. The API waits for PostgreSQL to be ready before running Prisma setup and starting the Next.js app.
