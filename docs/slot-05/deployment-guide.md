# Production Cloud Deployment Guide & Public URL Checklist (Slot 5)

> **Course:** Course 4 — The Modern AI Software Developer (ADLC01) | FPT University  
> **Target Tier:** Free-Tier Cloud Hosting (Neon + Render + Vercel)  
> **Course Policy:**
> - **Zero Paid Infrastructure:** Do NOT create or modify paid cloud resources.
> - **Truth in Deployment:** Do NOT claim public deployment unless real live deployment and end-to-end verification have been performed and proven with real evidence.

---

## 1. Reference Architecture & Hosting Providers

The course standardizes on the following three-tier deployment stack:

| Tier | Provider | Service Type | Deployment Mechanism | Required Environment Variables |
|:---|:---|:---|:---|:---|
| **Database** | **Neon** | Serverless PostgreSQL 16 | Instant cloud branch provisioning | `DATABASE_URL` (with `?sslmode=require`) |
| **Backend API** | **Render** | Node.js Web Service | GitHub repository push | `DATABASE_URL`, `PORT=10000`, `NODE_ENV=production`, `CORS_ORIGIN` |
| **Frontend Web** | **Vercel** | Static Vite SPA | GitHub repository push | `VITE_API_URL` |

---

## 2. Step-by-Step Deployment Walkthrough

### Step 1: Provision Managed Database on Neon
1. Log in to [Neon Console](https://console.neon.tech).
2. Create a new project: `course4-task-manager`.
3. Choose region closest to users (e.g., `Singapore - ap-southeast-1`).
4. Copy the pooled connection string:
   ```
   postgresql://<user>:<password>@<endpoint-pooler>.neon.tech/neondb?sslmode=require
   ```
5. In your local terminal, rehearse PostgreSQL schema generation:
   ```bash
   # Verify that PostgreSQL schema compiles cleanly
   npm run db:generate:postgres
   ```

### Step 2: Deploy Backend API on Render
1. Log in to [Render Dashboard](https://dashboard.render.com).
2. Click **New +** → **Web Service** → Connect your GitHub repository.
3. Configure the service:
   - **Name:** `course4-task-manager-api`
   - **Environment:** `Node`
   - **Branch:** `main` (or your Slot 5 release branch)
   - **Build Command:** `npm run build`
   - **Start Command:** `npm run start -w @course4/api`
4. Set **Environment Variables** in Render:
   - `NODE_ENV`: `production`
   - `PORT`: `10000` (Render default)
   - `DATABASE_URL`: *(Your Neon PostgreSQL connection string)*
   - `CORS_ORIGIN`: `https://your-team-app.vercel.app` *(Set to temporary Vercel preview or update after Step 3)*
   - `INCIDENT_DRILL_ENABLED`: `false`
5. Click **Deploy Web Service**.
6. Wait for build to complete. Note your public backend URL: `https://course4-task-manager-api.onrender.com`.

### Step 3: Deploy Frontend Web on Vercel
1. Log in to [Vercel Dashboard](https://vercel.com).
2. Click **Add New...** → **Project** → Import your GitHub repository.
3. Configure Framework & Workspaces:
   - **Framework Preset:** `Vite`
   - **Root Directory:** `apps/web`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Set **Environment Variables** in Vercel:
   - `VITE_API_URL`: `https://course4-task-manager-api.onrender.com`
5. Click **Deploy**.
6. Note your public frontend URL: `https://your-team-app.vercel.app`.
7. **Important:** Return to Render and update `CORS_ORIGIN` to match your exact Vercel frontend URL.

---

## 3. Public URL Verification Checklist

Before claiming production readiness or presenting on Demo Day, teams MUST verify and record evidence for all items below against the **live public URLs** (not localhost):

### Verification Matrix

| Check ID | Verification Item | Target Endpoint / URL | Expected Evidence | Status |
|:---|:---|:---|:---|:---|
| **URL-01** | **Root UI Loads** | `https://your-team-app.vercel.app` | React SPA renders task board header, input form, and filter controls. | `[ ]` |
| **URL-02** | **Health Check OK** | `https://your-api.onrender.com/health` | Returns HTTP 200 with `"status": "ok"` and `"database": "connected"`. | `[ ]` |
| **URL-03** | **Restricted CORS** | `GET /health` with Origin header | Response contains `Access-Control-Allow-Origin: <vercel-url>`. | `[ ]` |
| **URL-04** | **Create Task Flow** | UI "Add Task" button | Task is created, persisted across page refresh, and given a UUID. | `[ ]` |
| **URL-05** | **Edit / Complete** | UI checkbox / edit title | State updates immediately in UI and persists in Neon database. | `[ ]` |
| **URL-06** | **Sanitized 404** | `GET /api/tasks/invalid-uuid-1234` | Returns HTTP 404 with `{ "error": "Task not found" }`. Zero stack leaks. | `[ ]` |
| **URL-07** | **Structured Logs** | Render Log Viewer | Each incoming request outputs structured JSON with `reqId` and duration. | `[ ]` |
| **URL-08** | **Zero Secrets Exposed** | `dist/assets/*.js` in DevTools | No database passwords, JWT secrets, or cloud keys bundled in client code. | `[ ]` |

---

## 4. Troubleshooting Cloud-Specific Issues

### 1. Render Free Tier Spin-Down (Cold Start)
- *Behavior:* Free-tier Render instances sleep after 15 minutes of inactivity. First request may take 30–50 seconds to respond.
- *Remedy:* Warm up the API 5 minutes before your Demo Day presentation by executing `curl https://your-api.onrender.com/health`.

### 2. Neon Connection Pooling
- *Behavior:* Serverless backends that spawn multiple connections may exhaust limits if direct connections are used.
- *Remedy:* Always use Neon's pooled connection string containing `-pooler` in the hostname.
