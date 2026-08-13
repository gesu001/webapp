# RSS2LMS Frontend

This frontend extends the original RSS2LMS interface with an API-driven RSS client. It reads feed data from the backend server and displays operational responses such as server health, feed counts, and database-backed content.

## Features

- Existing feed browsing UI retained from Assessment 1
- New RSS Client page that fetches live server data
- Backend health/status display
- Feed count and request count monitoring
- Theme and favorites support

## Run locally

```bash
npm install
npm run dev -- --hostname 0.0.0.0
```

The frontend is designed to call the backend through local rewrites. In development, requests to `/api/*`, `/health`, and `/count` are proxied to the API server.

## Default backend URL

```bash
NEXT_PUBLIC_API_URL=http://localhost:4080
```

## Main routes

- `/` – landing page
- `/feeds` – feed browsing
- `/rss-client` – database-backed RSS feed display
- `/favorites` – saved content
- `/about` – project context
- `/settings` – preferences

## Docker

The app is intended to run alongside the API and PostgreSQL services in the root Docker Compose file. The project is structured so the API and frontend can be launched together for local demonstration.
