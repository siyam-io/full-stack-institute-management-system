<div align="center">

# 🎓 Culinary Academy

### Enterprise-Grade Full-Stack Institute Management System & Multilingual Public Portal

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18%20%7C%2019-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Express](https://img.shields.io/badge/Express.js-4.18-000000?style=for-the-badge&logo=express)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.0-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Vercel](https://img.shields.io/badge/Vercel-Deploy%20Ready-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

<p align="center">
  A state-of-the-art educational management system designed for culinary institutes, vocational academies, and professional training centers. Features a high-converting bilingual public website, real-time dynamic CMS controls, student lifecycle management, and enterprise-grade role-based access control.
</p>

</div>

---

## 📑 Table of Contents

- [System Architecture](#-system-architecture)
- [Project Structure](#-project-structure)
- [Key Features](#-key-features)
  - [1. Public Website & Student Portal (`frontend/`)](#1-public-website--student-portal-frontend)
  - [2. Institute Admin Dashboard (`admin-panel/`)](#2-institute-admin-dashboard-admin-panel)
  - [3. Backend RESTful API (`backend/`)](#3-backend-restful-api-backend)
- [🚀 Quick Start (Local Development)](#-quick-start-local-development)
- [☁️ Deploying to Vercel (Step-by-Step)](#️-deploying-to-vercel-step-by-step)
  - [Option A: Deploying Frontend (Next.js)](#option-a-deploying-frontend-nextjs)
  - [Option B: Deploying Admin Panel (Vite SPA)](#option-b-deploying-admin-panel-vite-spa)
- [🗄️ Backend & Database Deployment](#️-backend--database-deployment)
- [🔐 Environment Variables](#-environment-variables)
- [📄 License](#-license)

---

## 🏛 System Architecture

```mermaid
graph TD
    Client[Visitors & Prospective Students] -->|HTTPS| Frontend[Next.js 14 Public Portal]
    Admin[Institute Administrators & Instructors] -->|HTTPS| AdminPanel[Vite + React 19 Dashboard]
    
    Frontend -->|Server/Client Fetch| Backend[Express.js REST API :3043]
    AdminPanel -->|REST API / JWT| Backend
    
    Backend -->|Prisma ORM| Postgres[(PostgreSQL Database)]
    Backend -->|Static / Uploads| Storage[Local / Cloud Media Storage]
```

---

## 📁 Project Structure

```bash
full-stack-institute-management-system/
├── frontend/             # Next.js 14 App Router (Public web portal & CMS client)
│   ├── src/app/          # Multilingual routes ([locale]: /en, /bn, /courses, /about, /faq)
│   ├── src/components/   # Reusable UI modules (Hero, CourseShowcase, Footer, Header)
│   ├── content/          # Static fallback JSON & localized content
│   └── public/           # Logos, favicons, and high-res imagery
│
├── admin-panel/          # Vite + React 19 Single Page Application
│   ├── src/pages/        # Dashboard, Students, Courses, CMS Editors, Finance
│   ├── src/components/   # Admin UI components, layout shell, QR code modals
│   └── public/           # Admin branding assets and favicons
│
└── backend/              # Node.js + Express.js API
    ├── src/modules/      # Feature modules (auth, students, courses, cms, finance)
    ├── src/core/db/      # Prisma client and raw SQL helpers
    └── prisma/           # PostgreSQL schema definitions & migrations
```

---

## ✨ Key Features

### 1. Public Website & Student Portal (`frontend/`)
- **Modern Spatial UI / UX**: Built with responsive layouts, dark aesthetics, smooth gradients, and micro-interactions.
- **Full Bilingual Localization (`next-intl`)**: Instant toggle between English (`/en`) and Bengali (`/bn`) with automated cookie and header persistence.
- **Dynamic CMS Integration**: Content seamlessly syncs from the backend PostgreSQL database (with zero-downtime static JSON fallbacks).
- **SEO & Social Optimization**: Dynamic sitemap (`sitemap.xml`), OpenGraph metadata, IndexNow protocol, and structured schema markup.
- **Enterprise Lead Engine**: Cloudflare Turnstile CAPTCHA protected admission forms with direct Google Sheets webhook integration.

### 2. Institute Admin Dashboard (`admin-panel/`)
- **Student Lifecycle Management**: Comprehensive records, batch allocations, attendance tracking, and printable ID cards with dynamic QR codes.
- **Visual CMS Control Center**: In-browser editors for Home Hero banners, Course Highlights, Mentors, FAQ items, and Testimonials without modifying code.
- **Academic & Course Architect**: Configurable courses, syllabus modules, fee structures, and batch schedules.
- **Financial Accounting**: Tuition fee management, automated payment receipt generation, and ledger tracking.
- **Role-Based Access Control (RBAC/PBAC)**: Granular permissions for Superadmins, Campus Managers, Instructors, and Accounts Executives.

### 3. Backend RESTful API (`backend/`)
- **Clean Layered Architecture**: Strict separation of concerns (`Route → Controller → Service → Repository → Prisma ORM`).
- **PostgreSQL Database**: Relational integrity with JSONB support for multilingual page schemas.
- **Security First**: JWT authentication with HTTP-only cookies, password hashing with bcrypt, input sanitization with Zod, and CORS whitelist protections.

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- **Node.js**: `v18.18.0` or higher (`v20+` recommended)
- **PostgreSQL**: Local instance or remote cloud database (Neon, Supabase, Railway)
- **Git**

### 1. Clone the Repository
```bash
git clone https://github.com/siyam-io/full-stack-institute-management-system.git
cd full-stack-institute-management-system
```

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env     # Configure your PostgreSQL DATABASE_URL
npx prisma generate
npm run dev              # Runs on http://localhost:3043
```

### 3. Admin Panel Setup
```bash
cd ../admin-panel
npm install
cp .env.example .env     # Points to http://localhost:3043/api
npm run dev              # Runs on http://localhost:5174
```

### 4. Frontend Setup
```bash
cd ../frontend
npm install
cp .env.example .env     # Configure your site URL and keys
npm run dev              # Runs on http://localhost:3000
```

---

## ☁️ Deploying to Vercel (Step-by-Step)

Both the **Frontend (Next.js)** and **Admin Panel (Vite)** are fully pre-configured for one-click deployment on [Vercel](https://vercel.com).

### Option A: Deploying Frontend (Next.js)

1. Log in to your [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New Project"**.
2. Import this GitHub repository.
3. In the project configuration:
   - **Framework Preset**: `Next.js`
   - **Root Directory**: Click *Edit* and select **`frontend`**
   - **Build Command**: `next build` (Default)
   - **Output Directory**: `.next` (Default)
4. Add Environment Variables:
   | Variable | Value | Description |
   | :--- | :--- | :--- |
   | `NEXT_PUBLIC_SITE_URL` | `https://your-domain.vercel.app` | Production domain |
   | `NEXT_PUBLIC_BACKEND_URL` | `https://your-backend-api.com` | Deployed backend URL |
5. Click **Deploy**. Vercel will automatically build and deploy your site with edge CDN routing.

---

### Option B: Deploying Admin Panel (Vite SPA)

1. In Vercel, create another project from the same repository.
2. In the project configuration:
   - **Framework Preset**: `Vite`
   - **Root Directory**: Click *Edit* and select **`admin-panel`**
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Add Environment Variables:
   | Variable | Value | Description |
   | :--- | :--- | :--- |
   | `VITE_API_URL` | `https://your-backend-api.com/api` | Backend API URL |
   | `VITE_FONTEND_URL` | `https://your-frontend.vercel.app` | Live frontend URL |
4. The included `admin-panel/vercel.json` automatically manages client-side SPA routing rewrites so deep links work seamlessly on page refresh.
5. Click **Deploy**.

---

## 🗄️ Backend & Database Deployment

Because the backend is a persistent Express server, it can be deployed to:
- **[Railway](https://railway.app)** *(Recommended)*: Connect repository, set root directory to `backend`, attach a free PostgreSQL plugin.
- **[Render](https://render.com)**: Create a Web Service with Root Directory `backend`, build command `npm install && npx prisma generate`, start command `npm start`.
- **Database Providers**: Works out of the box with [Neon](https://neon.tech), [Supabase](https://supabase.com), or standard VPS PostgreSQL.

---

## 🔐 Environment Variables

### Frontend (`frontend/.env`)
```ini
NEXT_PUBLIC_SITE_URL=https://culinaryacademy.com
NEXT_PUBLIC_BACKEND_URL=http://localhost:3043
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_cloudflare_turnstile_site_key
TURNSTILE_SECRET_KEY=your_cloudflare_turnstile_secret_key
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-sa@project.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."
GOOGLE_SHEET_ID=your_google_sheet_id
```

### Admin Panel (`admin-panel/.env`)
```ini
VITE_API_URL=http://localhost:3043/api
VITE_FONTEND_URL=http://localhost:3000
```

### Backend (`backend/.env`)
```ini
NODE_ENV=production
PORT=3043
DATABASE_URL="postgresql://user:pass@host:5432/culinary_academy?schema=public"
JWT_SECRET="your-super-secure-production-jwt-secret-key"
JWT_EXPIRES_IN="7d"
JWT_COOKIE_EXPIRES_IN=7
FRONTEND_URL="http://localhost:5174"
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

<div align="center">
  <b>Built with excellence for Culinary Academy</b>
</div>
