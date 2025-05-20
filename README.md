# 🚀 Cara Menjalankan Aplikasi di Laptop Lain
## 1. Clone atau Salin Project
Jika menggunakan Git:

git clone https://github.com/intanfalah/webapp_TA.git

cd webapp

Jika tidak, cukup salin folder webapp/ ke laptop lain.

## 2. Install Semua Dependencies
Jalankan perintah berikut di terminal:

npm install

Ini akan menginstal semua dependencies dan devDependencies, termasuk:

### ✅ Dependencies
react, react-dom — Library utama React

vite — Bundler modern

maplibre-gl — WebGL-based peta

leaflet, react-leaflet — Alternatif peta berbasis raster

@mui/material, @emotion/react, @emotion/styled — UI library (Material UI)

firebase — Integrasi backend/cloud

react-router-dom — Navigasi antar halaman

react-hook-form — Manajemen form

web-vitals — Pengukuran performa web

### 🛠️ DevDependencies
eslint, @eslint/js — Linter JavaScript

@vitejs/plugin-react — Plugin React untuk Vite

eslint-plugin-react-hooks, eslint-plugin-react-refresh — Linting khusus React

@types/react, @types/react-dom — Type definitions

globals — Global variables untuk linter

## 3. Menjalankan Project
npm run dev

Buka browser ke:

http://localhost:5173
