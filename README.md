# AnimeStream

AnimeStream adalah aplikasi streaming anime berbasis web yang dikembangkan dengan **Next.js** dan **Tailwind CSS**. Aplikasi ini memungkinkan pengguna untuk melihat daftar anime, detail anime, serta menonton anime secara langsung.

## 🚀 Fitur Utama
- **Daftar Anime Ongoing & Completed**
- **Top Rated Anime**
- **Detail Anime** (Episode, Skor, Status, Studio, dll.)
- **Streaming Anime Langsung**
- **Desain Responsif dengan Tailwind CSS**

## 🛠️ Teknologi yang Digunakan
- **Frontend:** Next.js (React Framework)
- **Styling:** Tailwind CSS
- **API Source:** [Wajik Anime API](https://github.com/wajik45/wajik-anime-api)

## 📦 Instalasi dan Menjalankan Project

1. **Clone Repository**
   ```sh
   git clone https://github.com/username/animestream.git
   cd animestream
   ```

2. **Install Dependencies**
   ```sh
   npm install
   ```

3. **Menjalankan Server Next.js**
   ```sh
   npm run dev
   ```
   Aplikasi akan berjalan di `http://localhost:3000`

## 🔗 API yang Digunakan
Proyek ini menggunakan [Wajik Anime API](https://github.com/wajik45/wajik-anime-api) sebagai sumber data anime. Pastikan API tersebut sudah berjalan sebelum menjalankan proyek.

### Contoh Endpoint yang Digunakan:
- **Daftar Anime Ongoing:** `GET http://localhost:3001/otakudesu/ongoing`
- **Daftar Anime Completed:** `GET http://localhost:3001/otakudesu/completed`
- **Detail Anime:** `GET http://localhost:3001/otakudesu/anime/{animeId}`

## 🎨 Struktur Proyek
```
/animestream
│── /public        # Assets publik (logo, gambar, dll.)
│── /components    # Komponen UI
│── /pages         # Halaman utama (Home, Detail, dll.)
│── /styles        # File CSS/Tailwind tambahan
│── package.json   # Konfigurasi dependensi
│── next.config.js # Konfigurasi Next.js
```

## 🤝 Kontribusi
Kami menerima kontribusi dari siapa saja! Jika ingin berkontribusi, ikuti langkah berikut:

1. **Fork repository ini**
2. **Buat branch baru** untuk fitur atau perbaikan bug (`git checkout -b feature-nama-fitur`)
3. **Lakukan perubahan dan commit** (`git commit -m "Menambahkan fitur XYZ"`)
4. **Push ke repository Anda** (`git push origin feature-nama-fitur`)
5. **Buat Pull Request (PR)** di repository utama

Kami akan meninjau PR Anda secepat mungkin. Terima kasih atas kontribusinya! 🚀

## 📄 Lisensi
Proyek ini menggunakan lisensi **MIT**. Silakan gunakan dan modifikasi sesuai kebutuhan.

---

💡 **Catatan:** Jangan lupa untuk menjalankan backend API [Wajik Anime API](https://github.com/wajik45/wajik-anime-api) sebelum menjalankan proyek ini! 🚀

---

# AnimeStream (English)

AnimeStream is a web-based anime streaming application developed with **Next.js** and **Tailwind CSS**. This application allows users to browse anime lists, view anime details, and stream anime directly.

## 🚀 Main Features
- **Ongoing & Completed Anime List**
- **Top Rated Anime**
- **Anime Details** (Episodes, Score, Status, Studio, etc.)
- **Direct Anime Streaming**
- **Responsive Design with Tailwind CSS**

## 🛠️ Technologies Used
- **Frontend:** Next.js (React Framework)
- **Styling:** Tailwind CSS
- **API Source:** [Wajik Anime API](https://github.com/wajik45/wajik-anime-api)

## 📦 Installation and Running the Project

1. **Clone the Repository**
   ```sh
   git clone https://github.com/username/animestream.git
   cd animestream
   ```

2. **Install Dependencies**
   ```sh
   npm install
   ```

3. **Run Next.js Server**
   ```sh
   npm run dev
   ```
   The application will run on `http://localhost:3000`

## 🔗 API Used
This project uses [Wajik Anime API](https://github.com/wajik45/wajik-anime-api) as its anime data source. Ensure the API is running before starting the project.

### Example API Endpoints:
- **Ongoing Anime List:** `GET http://localhost:3001/otakudesu/ongoing`
- **Completed Anime List:** `GET http://localhost:3001/otakudesu/completed`
- **Anime Details:** `GET http://localhost:3001/otakudesu/anime/{animeId}`

## 🎨 Project Structure
```
/animestream
│── /public        # Public assets (logo, images, etc.)
│── /components    # UI Components
│── /pages         # Main pages (Home, Detail, etc.)
│── /styles        # Additional CSS/Tailwind files
│── package.json   # Dependency configuration
│── next.config.js # Next.js configuration
```

## 🤝 Contribution
We welcome contributions from anyone! If you want to contribute, follow these steps:

1. **Fork this repository**
2. **Create a new branch** for your feature or bug fix (`git checkout -b feature-name`)
3. **Make changes and commit** (`git commit -m "Added XYZ feature"`)
4. **Push to your repository** (`git push origin feature-name`)
5. **Create a Pull Request (PR)** to the main repository

We will review your PR as soon as possible. Thank you for contributing! 🚀

## 📄 License
This project is licensed under the **MIT License**. Feel free to use and modify it as needed.

---

💡 **Note:** Make sure to run the [Wajik Anime API](https://github.com/wajik45/wajik-anime-api) backend before running this project! 🚀

