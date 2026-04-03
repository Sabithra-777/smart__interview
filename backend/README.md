# Smart Interview Backend

Express + PostgreSQL backend for Smart Interview project.

## Setup

1. Install dependencies:

   ```bash
   cd backend
   npm install
   ```

2. Copy env example:

   ```bash
   cp .env.example .env
   ```

3. Create database in PostgreSQL:

   ```sql
   CREATE DATABASE smart_interview;
   ```

4. Configure `DATABASE_URL` / `JWT_SECRET` in `.env`.

5. Run migrations:

   ```bash
   npm run migrate
   ```

6. Start server:
   ```bash
   npm run dev
   ```

## API endpoints

- POST `/api/auth/register`
- POST `/api/auth/login`
- GET `/api/questions/:category` (auth bearer token)
- POST `/api/results/submit` (auth bearer token)
- GET `/api/results` (auth bearer token)
- GET `/api/results/analytics` (auth bearer token)
- Admin endpoints require `role=admin`:
  - GET `/api/admin/questions`
  - POST `/api/admin/questions`
  - PUT `/api/admin/questions/:id`
  - DELETE `/api/admin/questions/:id`
  - GET `/api/admin/results`

## Frontend adaptation

In `frontend/vite-project/src/services/api.js`, replace mock APIs with network calls (e.g., `fetch` or `axios`) pointing to backend host `http://localhost:5000`.
