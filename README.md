# Full Stack Institute Management System

A comprehensive, production-ready Institute Management System built with a modern full-stack architecture (Node.js, Express, MongoDB, React, Vite, and Tailwind CSS).

## 🚀 Features

- **Role-Based Access Control (RBAC & PBAC)**: Superadmin, Admin, Registrar, Instructor, Staff with granular permission handling.
- **Academic Operations**: Batch scheduling, course management, syllabus tracking, classes, and student enrollments.
- **Student Management**: Public certificate verification, student details, QR Code ID generation, and attendance management.
- **Financial Management**: Fee tracking, payment collection, expense management, and analytics.
- **Inventory & Requisitions**: Stock tracking, department requisitions, and pantry management.
- **Multi-Branch Support**: Branch-specific dashboard metrics and data separation.

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js, MongoDB (Mongoose), JWT, Bcrypt, Multer, Cloudinary, Nodemailer.
- **Frontend**: React 19, Vite, Tailwind CSS, DaisyUI, React Router v7, TanStack Query, Zustand, Axios, Recharts, Lucide Icons.

## 📦 Project Structure

```
├── backend/    # Express REST API, MongoDB models, services & controllers
├── web2/       # React SPA frontend (Vite)
└── README.md
```

## ⚙️ Quick Start

### 1. Backend Setup
```bash
cd backend
npm install
npm run dev
```

### 2. Frontend Setup
```bash
cd web2
npm install
npm run dev
```
