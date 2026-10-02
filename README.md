<div align="center">

# 👨‍🍳 Culinary Academy
### Enterprise Full-Stack Institute Management System & Multilingual Public Portal

A high-performance, production-grade management and public portal platform built specifically for culinary arts academies, vocational institutes, and professional culinary institutes.

[![Live Frontend](https://img.shields.io/badge/Live_Portal-Next.js_14-black?style=for-the-badge&logo=vercel&logoColor=white)](https://frontend-alpha-one-4xdf3qqzp0.vercel.app)
[![Live Admin](https://img.shields.io/badge/Live_Admin-React_19_Vite-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://admin-panel-green-chi.vercel.app)
[![Live Backend](https://img.shields.io/badge/Live_API-Express_REST-000000?style=for-the-badge&logo=express)](https://backend-jade-three-35.vercel.app)
[![Database](https://img.shields.io/badge/Database-Neon_PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://neon.tech)
[![ORM](https://img.shields.io/badge/ORM-Prisma_6.0-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

<p align="center">
  <b>Bilingual Next.js Public Portal</b> • <b>Real-time Admin CMS Studio</b> • <b>Student Lifecycle & Attendance Engine</b> • <b>PostgreSQL + Prisma ORM</b>
</p>

</div>

---

## 🌐 Live Production Deployments

The entire system is deployed and fully operational on **Vercel** with a serverless **Neon Cloud PostgreSQL** database.

| Service | Technology | Live URL |
| :--- | :--- | :--- |
| **Public Portal & Website** | Next.js 14 (App Router) | [frontend-alpha-one-4xdf3qqzp0.vercel.app](https://frontend-alpha-one-4xdf3qqzp0.vercel.app) |
| **Institute Admin Dashboard** | Vite + React 19 (SPA) | [admin-panel-green-chi.vercel.app](https://admin-panel-green-chi.vercel.app) |
| **RESTful Core API** | Node.js + Express.js | [backend-jade-three-35.vercel.app](https://backend-jade-three-35.vercel.app) |
| **Cloud Database** | PostgreSQL 16 | [Neon Cloud Serverless PostgreSQL](https://neon.tech) |

### 🔐 Demo Superadmin Credentials
To test the live Admin Dashboard, navigate to [admin-panel-green-chi.vercel.app](https://admin-panel-green-chi.vercel.app) and log in with:

- **Email:** `ssiyam563@gmail.com`
- **Password:** `123456`
- **Role:** `SUPERADMIN` (Full administrative privileges)

---

## 🏛 System Architecture

```mermaid
flowchart TD
    subgraph Visitors & Students
        User["🌐 Students & Visitors"]
    end

    subgraph Administration
        Staff["👔 Institute Administrators & Mentors"]
    end

    subgraph Frontend Applications
        NextApp["🚀 Next.js 14 App Router\n(Public Multilingual Portal)"]
        ViteApp["⚡ React 19 + Vite SPA\n(Admin Management Studio)"]
    end

    subgraph Backend Core
        ExpressAPI["🛡️ Express.js REST API\n(Vercel Serverless Function)"]
        PrismaORM["⚡ Prisma ORM (v6.19)"]
    end

    subgraph Cloud Persistence
        NeonDB[("🐘 Neon PostgreSQL\n(Cloud Serverless DB)")]
        MediaStorage["📁 Cloud / Serverless Storage"]
    end

    User -->|Browse / Inquire / Register| NextApp
    Staff -->|Manage Institute & CMS| ViteApp

    NextApp -->|SSR & Client API Requests| ExpressAPI
    ViteApp -->|REST API with JWT & Cookies| ExpressAPI

    ExpressAPI --> PrismaORM
    PrismaORM --> NeonDB
    ExpressAPI --> MediaStorage
```

---

## 🌟 Key Modules & Capabilities

### 1. 🎓 Public Student & Visitor Portal (`frontend/`)
- **Next.js 14 App Router**: Server-side rendering (SSR), static generation (SSG), and streaming for maximum performance and lightning-fast load times.
- **Bilingual Internationalization (`next-intl`)**: Instant, seamless switching between **English (`/en`)** and **Bengali (`/bn`)** with automatic locale routing and cookie persistence.
- **Culinary Academy Showcase**: High-resolution interactive gallery displaying kitchen training, masterchef workshops, pastry arts, and flame sauté stations.
- **Dynamic Course Catalog**: Live syllabus display, pricing tiers, duration, instructor profiles, and prerequisite tracking.
- **Lead Capture & Verification**: Cloudflare Turnstile bot protection with Google Sheets integration and automated student inquiry routing.
- **SEO & Social Architecture**: Dynamic OpenGraph images, Twitter cards, JSON-LD structured schemas, dynamic `sitemap.xml`, and IndexNow indexing.

### 2. ⚡ Institute Admin Management Dashboard (`admin-panel/`)
- **Visual CMS Studio**: Live in-dashboard content editor for Hero banners, Mentors, Course highlights, Testimonials, and FAQs without touching code.
- **Student Lifecycle Management**: Registration, profile photo upload, course enrollment, batch assignment, and student status tracking.
- **Printable ID Cards & QR Badges**: Dynamic SVG/Canvas printable ID cards with embedded student verification QR codes.
- **Attendance & Batch Scheduler**: Real-time batch-wise attendance marking, session logs, and class rosters.
- **Academic Course Architect**: Module builder, syllabus outlines, instructor allocation, and seat limits.
- **Financial Accounting**: Tuition fee invoices, payment receipts, ledger records, and outstanding balance alerts.
- **Role-Based Access Control (RBAC)**: Fine-grained permissions for Superadmin, Admin, Instructor, and Accountant.

### 3. 🛡️ Robust Backend RESTful API (`backend/`)
- **Layered Architecture**: Strict industrial patterns (`Route → Controller → Service → Repository → Prisma Client`).
- **PostgreSQL Database**: Relational schemas with JSONB support for flexible bilingual course and CMS attributes.
- **Enterprise Security**:
  - JWT Authentication via HTTP-only, secure cookies & bearer headers.
  - BCrypt password hashing.
  - Zod validation pipelines on all inputs.
  - Safe serverless file uploads with dynamic CORS white-listing.
  - Audit logging middleware for compliance.

---

## 📁 Repository Directory Structure

```
full-stack-institute-management-system/
├── frontend/                     # Next.js 14 Public Application
│   ├── src/
│   │   ├── app/                  # App router with [locale] bilingual routing
│   │   │   └── [locale]/         # /en and /bn page trees
│   │   ├── components/           # Reusable UI widgets & sections
│   │   ├── content/              # Static fallback data for zero-downtime
│   │   └── lib/                  # Utilities, API client, internationalization
│   ├── public/                   # Academy imagery, chefs, and favicons
│   └── vercel.json               # Vercel deployment routing configuration
│
├── admin-panel/                  # Vite + React 19 Admin SPA
│   ├── src/
│   │   ├── pages/                # Dashboard, Students, Courses, CMS, Finance
│   │   ├── components/           # Admin layout shell, tables, QR modals
│   │   ├── context/              # AuthContext and global state
│   │   └── api/                  # Axios configured HTTP client
│   ├── public/                   # Admin branding assets
│   └── vercel.json               # SPA client-side rewrite configurations
│
├── backend/                      # Node.js + Express.js API
│   ├── api/                      # Vercel Serverless Function entrypoint
│   ├── src/
│   │   ├── modules/              # auth, students, courses, cms, finance, users
│   │   ├── core/                 # Error handling, database connectors, audit
│   │   ├── middlewares/          # JWT auth, role validation, multer upload
│   │   └── config/               # Dynamic CORS, environment configuration
│   ├── prisma/                   # schema.prisma & database seed scripts
│   └── vercel.json               # Serverless runtime configuration
│
└── README.md                     # Project documentation
```

---

## 🛠️ Tech Stack & Technologies

| Layer | Technology | Key Libraries |
| :--- | :--- | :--- |
| **Public Frontend** | Next.js 14, React 18/19 | `next-intl`, Tailwind CSS, Lucide Icons, Framer Motion |
| **Admin Panel** | React 19, Vite | Tailwind CSS, React Router v6, Axios, Lucide React, QRCode |
| **Backend API** | Node.js, Express.js | Prisma ORM, JWT, Bcryptjs, Multer, Zod, Cookie-Parser |
| **Database** | PostgreSQL 16 (Neon) | Prisma Engine, Full-text Search, Relational Integrity |
| **Hosting & CI/CD** | Vercel Serverless | Edge CDN, Automatic SSL, Serverless Functions |

---

## 🚀 Local Development Setup

### Prerequisites
- **Node.js**: `v18.18.0` or higher (`v20+` LTS recommended)
- **PostgreSQL**: Local database or free [Neon](https://neon.tech) cloud database
- **Git**

### 1. Clone the Repository
```bash
git clone https://github.com/siyam-io/full-stack-institute-management-system.git
cd full-stack-institute-management-system
```

### 2. Setup Backend
```bash
cd backend
npm install
cp .env.example .env

# Set your DATABASE_URL in .env
npx prisma generate
npx prisma db push

# Start backend server
npm run dev
# Server runs on: http://localhost:3043
```

### 3. Setup Admin Panel
```bash
cd ../admin-panel
npm install
cp .env.example .env

# Start admin panel
npm run dev
# Dashboard runs on: http://localhost:5174
```

### 4. Setup Public Frontend
```bash
cd ../frontend
npm install
cp .env.example .env

# Start frontend portal
npm run dev
# Portal runs on: http://localhost:3000
```

---

## ⚙️ Environment Variables Reference

### Backend (`backend/.env`)
```ini
NODE_ENV=development
PORT=3043
DATABASE_URL="postgresql://user:password@host:5432/dbname?sslmode=require"
JWT_SECRET="your-super-secure-production-jwt-secret-key"
JWT_EXPIRES_IN="7d"
JWT_COOKIE_EXPIRES_IN=7
FRONTEND_URL="http://localhost:5174"
```

### Admin Panel (`admin-panel/.env`)
```ini
VITE_API_URL=http://localhost:3043/api
VITE_FONTEND_URL=http://localhost:3000
```

### Frontend (`frontend/.env`)
```ini
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_BACKEND_URL=http://localhost:3043
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_cloudflare_turnstile_site_key
TURNSTILE_SECRET_KEY=your_cloudflare_turnstile_secret_key
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-sa@project.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."
GOOGLE_SHEET_ID=your_google_sheet_id
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/siyam-io/full-stack-institute-management-system/issues).

---

## 📜 License

This project is licensed under the **MIT License**.

<div align="center">
  <sub>Crafted with passion for Culinary Academy & Modern Institute Management</sub>
</div>
