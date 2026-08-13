#!/bin/sh
set -eu

./wait-for-it.sh postgres:5432 --timeout=30 --strict -- echo "✅ Postgres is up"

npx prisma generate
npx prisma db push

npm run dev -- --hostname 0.0.0.0