# Smart Interview — Backend (Express + PostgreSQL)

Node.js + Express backend with Neon PostgreSQL. Deployed on Render.

## Tech Stack

- Node.js + Express
- PostgreSQL via `pg` (Neon hosted)
- JWT authentication (`jsonwebtoken`)
- Password hashing (`bcrypt`)

## Local Setup

```bash
npm install
```

Create `.env`:
```
PORT=5000
DATABASE_URL=postgresql://<user>:<password>@<host>/<db>?sslmode=require
JWT_SECRET=your_secret_key
```

Run migrations:
```bash
npm run migrate
```

Seed 50 questions into DB:
```bash
node src/scripts/seed.js
```

Start dev server:
```bash
npm run dev
```

Runs at **http://localhost:5000**

## API Endpoints

### Auth (Public)
| Method | Route | Body |
|---|---|---|
| POST | `/api/auth/register` | `{ name, email, password, role }` |
| POST | `/api/auth/login` | `{ email, password }` |

### Questions (Bearer token required)
| Method | Route | Description |
|---|---|---|
| GET | `/api/questions/:category` | Get 10 questions for a category |

### Results (Bearer token required)
| Method | Route | Description |
|---|---|---|
| POST | `/api/results/submit` | Submit test answers, get score |
| GET | `/api/results` | Get logged-in user's test history |
| GET | `/api/results/analytics` | Get topic-wise performance analytics |

### Admin (Bearer token + admin role required)
| Method | Route | Description |
|---|---|---|
| GET | `/api/admin/questions` | Get all questions |
| POST | `/api/admin/questions` | Add new question |
| PUT | `/api/admin/questions/:id` | Edit question |
| DELETE | `/api/admin/questions/:id` | Delete question |
| GET | `/api/admin/results` | Get all student results |
| POST | `/api/admin/seed-questions` | Seed default 50 questions |

## Database Schema

**users** — id, name, email, password_hash, role, created_at  
**questions** — id, category, question, options (JSONB), correct_answer, difficulty, created_at  
**results** — id, user_id (FK), category, score, total_questions, percentage, created_at

## Deployment (Render)

- Root directory: `backend`
- Build command: `npm install`
- Start command: `node src/index.js`
- Environment variables: `DATABASE_URL`, `JWT_SECRET`, `PORT`
