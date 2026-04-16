# Smart Interview — Frontend (React + Vite)

React 18 frontend deployed on Netlify. Connects to Express + PostgreSQL backend on Render.

## Quick Start

```bash
npm install
npm run dev
```

Runs at **http://localhost:5173**

Create `.env`:
```
VITE_API_URL=http://localhost:5000
```

## Build for Production

```bash
npm run build
```

Output goes to `dist/` — ready for Netlify.

## Pages & Routes

| Page | Route | Access |
|---|---|---|
| Home | `/` | Public |
| Login | `/login` | Public |
| Student Login | `/login/student` | Public |
| Admin Login | `/login/admin` | Public |
| Register | `/register` | Public |
| Dashboard | `/dashboard` | Protected |
| Test | `/test/:category` | Protected |
| Results | `/results` | Protected |
| History | `/history` | Protected |
| Admin Panel | `/admin` | Protected (admin only) |

## Key Files

| File | Purpose |
|---|---|
| `src/services/api.js` | All fetch-based calls to backend API |
| `src/services/mockData.js` | Local question data (not used in production) |
| `src/components/ProtectedRoute.jsx` | Redirects to `/login` if no JWT token |
| `src/components/Navbar.jsx` | Role-aware navigation bar |
| `.env` | `VITE_API_URL` pointing to Render backend |
| `netlify.toml` | Netlify build config + SPA redirect rule |
| `public/_redirects` | Fallback SPA routing for Netlify |

## Deployment (Netlify)

- Base directory: `frontend/vite-project`
- Build command: `npm run build`
- Publish directory: `dist`
- Environment variable: `VITE_API_URL=https://smart-interview-k8g6.onrender.com`
