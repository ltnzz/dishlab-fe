# Dishlab Frontend

Frontend untuk aplikasi Dishlab yang dibuat dengan `React`, `Vite`, dan `Tailwind CSS`. Aplikasi ini digunakan untuk menampilkan daftar resep, melihat detail resep, memfilter data, serta menambahkan resep baru melalui modal form.

## Fitur

- Menampilkan list resep dalam grid responsive
- Detail resep dengan accordion untuk langkah memasak
- Filter resep berdasarkan search, kategori, tingkat kesulitan, dan sorting
- Pagination
- Modal form tambah resep
- Dynamic input untuk bahan dan langkah
- Validasi minimal 1 bahan dan 1 langkah
- Loading state dan empty state
- Konfirmasi submit dan feedback sukses/gagal

## Tech Stack

- React
- Vite
- Tailwind CSS
- React Router DOM
- Lucide React

## Struktur Folder

```text
dishlab-fe/
|-- public/
|-- src/
|   |-- assets/
|   |-- components/
|   |   |-- common/
|   |   |-- form/
|   |   |-- recipe/
|   |   |-- ui/
|   |-- pages/
|   |-- service/
|   |-- App.jsx
|   |-- index.css
|   |-- main.jsx
|-- .gitignore
|-- index.html
|-- package.json
|-- tailwind.config.js
|-- vite.config.js
|-- README.md
```

## Halaman dan Komponen Utama

- `Home`: menampilkan daftar resep, filter, pagination, modal, dan detail resep
- `RecipeCard`: kartu resep di grid
- `FilterBar`: search, filter kategori, filter kesulitan, dan sorting
- `RecipeModal`: form tambah resep
- `Accordion`: daftar langkah memasak dengan animasi buka tutup
- `Pagination`: navigasi halaman data

## Koneksi Backend

Frontend ini mengambil data dari backend lokal di:

```text
http://localhost:3000/api/recipes
```

Pastikan backend `dishlab-be` sudah berjalan sebelum frontend dijalankan.

## Instalasi

### 1. Clone repository

```bash
git clone https://github.com/ltnzz/dishlab-fe.git
cd dishlab-fe
```

### 2. Install dependency

```bash
npm install
```

## Menjalankan Project

Mode development:

```bash
npm run dev
```

Mode preview:

```bash
npm run preview
```

Build production:

```bash
npm run build
```

Jika berhasil, frontend biasanya berjalan di:

```text
http://localhost:5173
```

## Alur Menjalankan Full App

1. Jalankan backend `dishlab-be`
2. Pastikan PostgreSQL dan backend API aktif
3. Jalankan frontend `dishlab-fe`
4. Buka browser ke `http://localhost:5173`

## Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Catatan

- URL backend saat ini masih ditulis langsung di file service/frontend
- Jika backend berjalan di port lain, update URL pada file service yang memanggil API
- Pastikan CORS backend mengizinkan origin frontend
