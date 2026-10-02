# Full Stack Institute Management System

A comprehensive, production-grade Institute Management System built with a modular full-stack architecture.

## 📁 Project Structure

```
├── backend/        # Express.js REST API, PostgreSQL + Prisma ORM
├── admin-panel/    # Vite + React 19 Admin & Management Dashboard
└── frontend/       # Next.js 14 Public Website & Student Portal
```

---

## 🛠️ Tech Stack & Services

- **Backend** (`backend/`):
  - Node.js & Express.js (Feature-module layered architecture: Route → Controller → Service → Repository → Prisma)
  - PostgreSQL with Prisma ORM
  - JWT Authentication, RBAC/PBAC permission system
  - File upload, PDF & QR code generation, email services

- **Admin Panel** (`admin-panel/`):
  - React 19, Vite, Tailwind CSS, DaisyUI
  - TanStack Query, Zustand, React Router v7
  - Modules: Batches, Courses, Students, Finance, Inventory, Requisitions, CMS & Blog

- **Frontend** (`frontend/`):
  - Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS
  - Framer Motion, Cloudflare Turnstile, multi-language support (next-intl)

---

## 🚀 Quick Start

### 1. Backend (`http://localhost:3043`)
```bash
cd backend
npm install
npx prisma generate
npm run dev
```

### 2. Admin Panel (`http://localhost:5174`)
```bash
cd admin-panel
npm install
npm run dev
```

### 3. Frontend (`http://localhost:3000`)
```bash
cd frontend
npm install
npm run dev
```
