# 🧩 Task Management

## 📘 Deskripsi Singkat

Aplikasi fullstack untuk mengelola dan memonitor tugas harian karyawan dan sistem autentikasi sudah menggunakan JWT.

## 🚀 Cara Menjalankan

### Backend

1. cd backend
2. cp .env.example .env
3. composer install
4. php artisan key:generate
5. php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"
6. php artisan jwt:secret
7. php artisan migrate
8. php artisan serve

### Frontend

1. cd frontend
2. cp .env.example .env
3. npm install
4. npm run dev

## ⚙️ Teknologi

-   Laravel 12 (Backend)
-   React 19 + TailwindCSS 3 (Frontend)
-   PostgreSQL (Database)
-   JWT Auth
-   Axios + React Router DOM

## 🔑 Login Dummy

-   email: test@example.com
-   password: password123

## 🗃️ Struktur Database

-   users (id, name, username, email, password)
-   tasks (id, user_id, title, description, status, deadline, created_by, timestamps)

## 🖼️ Screenshot Tampilan

-   login.png
-   dashboard.png
-   task_crud.png
