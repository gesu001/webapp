# RSS2LMS

A full-stack RSS aggregation demo consisting of a Next.js API backed by PostgreSQL/Prisma and a Next.js frontend that consumes it.

## Project structure

```
webapp/
├── docker-compose.yml   # Orchestrates frontend, api, and postgres services
├── api/                 # Backend REST API (Next.js, Prisma, PostgreSQL)
└── frontend/             # Frontend UI (Next.js)
```

See [api/README.md](api/README.md) and [frontend/README.md](frontend/README.md) for service-specific details.

## Services

| Service    | Tech               | Port (host) |
|------------|--------------------|-------------|
| `frontend` | Next.js            | 80          |
| `api`      | Next.js + Prisma   | 4080        |
| `postgres` | PostgreSQL 15      | 5432        |

## Run with Docker Compose

```bash
cd webapp
docker-compose up --build
```

- Frontend: `http://<host>`
- API: `http://<host>:4080`

Postgres data persists in the `postgres_data` volume. The API waits for PostgreSQL to become available before generating the Prisma client and syncing the schema (see [api/entrypoint.sh](api/entrypoint.sh)).

## Run services individually

Each service can also be run without Docker — see the "Run locally" sections in [api/README.md](api/README.md) and [frontend/README.md](frontend/README.md).

## Key routes

- `/rss-client` – live, database-backed RSS feed browser (filter/sort/view, feed detail pages)
- `/api/feeds`, `/api/feeds/[id]` – feed CRUD endpoints
- `/api/health` – database health check
- `/api/count` – request counter

## Configuration

Both `frontend/next.config.ts` and `api/next.config.ts` set `allowedDevOrigins` for the dev server; update these if the host IP changes. The frontend proxies `/api/*`, `/health`, and `/count` to the API via rewrites, using `NEXT_PUBLIC_API_URL` (defaults to `http://localhost:4080`, set to `http://api:3000` in Docker Compose).
