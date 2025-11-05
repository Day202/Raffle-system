# Raffle System - Vite + React + Vercel-ready (no DB)

This package contains:
- `/client` — Vite + React frontend (TypeScript)
- `/api` — simple serverless endpoints using file-based JSON storage
- `/data/storage.json` — initial empty store (participants, winners)

## Deploying to Vercel
1. Upload repository to GitHub.
2. Import project into Vercel.
3. Set Root Directory to `/` (Vercel will detect `client` and `api`).
4. In Vercel Project settings, ensure Build command is `npm run build` (or leave to Vercel defaults).
5. Redeploy.

Note: Serverless functions store data in `/data/storage.json` — this is ephemeral on serverless platforms, but will persist across deployments for Vercel's default filesystem usage during a single instance. For production, use a true database.

## Local development
Run the client locally:
```
cd client
npm install
npm run dev
```

API functions can be tested using Vercel CLI or locally by calling the files under `/api` (they are simple Node handlers).

