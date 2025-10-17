# 🧩 Task Management

## 📘 Deskripsi Singkat

Aplikasi fullstack untuk mengelola dan memonitor tugas harian karyawan dan sistem autentikasi sudah menggunakan JWT.

## 🚀 Cara Menjalankan

[Note]:

1. Pastikan sudah menginstal Composer, PHP ≥ 8.2, Node.js ≥ 22, dan Docker Desktop (jika ingin menjalankan melalui container).
2. .env lokal silahkan disesuaikan dengan environment lokal dan untuk docker password defaultnya: secret123

### 1. Run di Lokal

### Backend

1. cd backend
2. cp .env.example .env
3. composer install
4. php artisan key:generate
5. php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"
6. php artisan jwt:secret
7. php artisan migrate --seed
8. php artisan serve

### Frontend

1. cd frontend
2. cp .env.example .env
3. npm install
4. npm run dev

### 2. Run di Docker

```bash
docker compose up -d --build
docker compose exec backend php artisan migrate --seed
```

## ⚙️ Teknologi

-   Laravel 12 (Backend)
-   React 19 + TailwindCSS 3 (Frontend)
-   PostgreSQL (Database)
-   JWT Auth
-   Axios + React Router DOM
-   Docker

## 🔑 Login Dummy

-   email: test@example.com
-   password: password123

## 🗃️ Struktur Database

-   users (id, name, username, email, password)
-   tasks (id, user_id, title, description, status, deadline, created_by, timestamps)

## 🖼️ Screenshot Tampilan

Berikut beberapa tampilan dari aplikasi Task Management System:

-   [Login Page](https://github.com/dimasawp/task-management/blob/main/screenshots/login.png)
-   [Dashboard](https://github.com/dimasawp/task-management/blob/main/screenshots/dashboard.png)
-   [Task CRUD](https://github.com/dimasawp/task-management/blob/main/screenshots/task_crud.png)

## 🧩 API Collection

Untuk menguji endpoint API, kamu dapat menggunakan file Postman Collection berikut:

📁 [Task Management Postman Collection](https://github.com/dimasawp/task-management/blob/main/task_management.postman_collection.json)
