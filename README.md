# AI Mental Screening Assistant

Aplikasi web modern untuk deteksi dini kesehatan mental menggunakan analisis AI (Teks, Suara, Wajah) dan tes standar klinis. Dirancang untuk Pasien dan Tenaga Kesehatan (Nakes).

## 🚀 Cara Menjalankan Aplikasi

### 1. Persiapan
Pastikan Anda sudah menginstal **Node.js** (versi 18 atau terbaru) di komputer Anda.

### 2. Instalasi Dependensi
Buka terminal di dalam folder proyek ini, lalu jalankan perintah berikut untuk mengunduh semua pustaka yang dibutuhkan:
```bash
npm install
```

### 3. Menjalankan Server Development
Untuk memulai aplikasi, jalankan perintah:
```bash
npm run dev
```
Setelah server berjalan, buka browser Anda dan kunjungi **[http://localhost:3000](http://localhost:3000)**.

---

## 📱 Panduan Penggunaan Fitur

### 🏥 Mode Pasien (Patient)
Pilih tombol **"Pasien"** di halaman depan untuk masuk ke portal pasien.

1. **Skrining Teks**
   - Ketik apa yang Anda rasakan atau pikirkan.
   - AI akan menganalisis sentimen dan kata kunci untuk mendeteksi tingkat stres atau kecemasan.

2. **Analisis Suara**
   - Tekan tombol mikrofon dan bicaralah selama 20-40 detik.
   - Sistem akan menganalisis nada, intonasi, dan kestabilan suara.

3. **Analisis Ekspresi Wajah**
   - Izinkan akses kamera.
   - Sistem akan memindai ekspresi mikro wajah untuk mendeteksi kelelahan (fatigue) atau emosi dominan.
   - *Privasi*: Video diproses lokal dan tidak disimpan.

4. **Tes Standar**
   - **PHQ-9**: Kuesioner untuk skrining depresi.
   - **GAD-7**: Kuesioner untuk skrining kecemasan umum.

### 👨‍⚕️ Mode Tenaga Kesehatan (Nakes)
Pilih tombol **"Tenaga Kesehatan"** di halaman depan.

1. **Cek Burnout**
   - Kuesioner khusus untuk mendeteksi risiko *burnout* (kelelahan kerja) pada tenaga medis.
   - Memberikan rekomendasi tindakan berdasarkan tingkat risiko (Rendah, Sedang, Tinggi).

2. **Statistik Rumah Sakit**
   - **Heatmap**: Visualisasi tingkat stres per unit (IGD, ICU, Rawat Inap, dll).
   - Memantau tren kesehatan mental staf secara keseluruhan.

---

## ℹ️ Catatan Teknis
- **Framework**: Next.js 14 (App Router)
- **Styling**: Vanilla CSS dengan Design Tokens (Premium UI)
- **AI Engine**: Saat ini menggunakan *Mock AI Service* (Simulasi) untuk tujuan demonstrasi prototipe. Respons cepat dan konsisten untuk pengujian UI/UX.

---
*Dibuat oleh Tim Pengembang AI Mental Screening Assistant.*
# mental-screening
