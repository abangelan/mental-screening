Aplikasi “AI Mental Screening Assistant”

(Skrining Mental untuk Pasien & Nakes)

Dokumen ini sudah dalam format profesional dan siap diberikan ke software engineer, UI/UX, dan manajemen rumah sakit.

🟦 1. Ringkasan Produk (Executive Summary)

Aplikasi AI Mental Screening Assistant adalah platform digital yang mendeteksi tingkat stres, kecemasan, depresi, dan burnout pada pasien maupun tenaga kesehatan (Nakes). Sistem menggunakan analisis teks, suara, dan opsional ekspresi wajah untuk memberikan skor mental health secara ilmiah.

Hasilnya berupa:

Skor risiko mental

Insight kondisi

Saran tindakan awal

Rekomendasi rujukan ke psikolog/psikiater RS

Dirancang untuk:

Rumah sakit umum,

Rumah sakit militer,

Klinik MCU,

Klinik korporasi (karyawan).

🟦 2. Tujuan Produk (Goals)
Tujuan Utama

Menyediakan skrining mental cepat dan akurat berbasis AI.

Mendeteksi burnout pada tenaga kesehatan lebih dini.

Membantu pasien memahami kondisi mentalnya tanpa stigma.

Mengurangi antrean konsultasi dengan memprioritaskan risiko sedang–tinggi.

Menjadi alat triase psikologis modern untuk RS.

🟦 3. Fitur Utama (Core Features)
3.1. AI Text Screening

Pengguna mengetik cerita, keluhan, atau mengisi pertanyaan terbuka.
AI melakukan analisis:

Sentiment analysis,

Emotional intensity,

Key mental markers (hopelessness, worry, panic, etc.),

Burnout sentiment markers.

Output:

Skor stres

Skor kecemasan

Skor depresi

Skor burnout

3.2. AI Voice Screening

Pengguna menekan record lalu berbicara 20–40 detik.
AI menganalisa:

Tremor suara

Pitch & intonasi

Irama bicara cepat/lambat

Napas tersengal

AI mendeteksi pola yang berkaitan dengan kecemasan/depresi.

3.3. AI Facial Screening (Opsional)

Mode kamera depan (hanya jika pengguna setuju).
AI analisa:

micro-expression (sadness, anger, fear, neutral)

tingkat kelelahan wajah

tanda-tanda depresi ringan

Privasi sangat dijaga → tidak menyimpan video mentah.

3.4. Self-Assessment Screening Tools

Termasuk tes standar:

DASS-21

PHQ-9 (Depresi)

GAD-7 (Kecemasan)

Burnout Inventory (untuk Nakes)

Hasil otomatis terintegrasi ke dashboard.

3.5. AI Recommendation Engine

Setelah skor keluar, AI memberikan:

Insight kondisi,

Tips penanganan awal (relaxation, journaling, breathing test),

Kapan harus ke psikolog/psikiater,

Link booking konseling di RS.

3.6. Dashboard Nakes & Admin RS

Fitur:

Statistik harian/mingguan,

Heatmap burnout per unit (IGD, ICU, OK, Rawat Inap),

Alert otomatis jika ada nakes berisiko tinggi,

Data pasien dengan risiko sedang/tinggi untuk follow-up.

3.7. Mode Pasien & Mode Nakes (2 User Type)
Mode Pasien

Skrining mental ringan–sedang

Edukasi kesehatan mental

Booking konselor

Mode Nakes

Skrining burnout

Tracking stress harian

Notifikasi konseling internal RS

3.8. Keamanan & Privasi

Enkripsi end-to-end

Data suara/wajah tidak disimpan, hanya embedding

Mode anonim untuk nakes

Sesuai regulasi UU PDP

🟦 4. Persona Pengguna
1. Pasien

Datang dengan keluhan psikosomatis / kecemasan / depresi ringan

Perlu edukasi mental health

2. Tenaga Kesehatan

Dokter IGD, ICU, OK, Perawat, Bidan

Potensi burnout tinggi

3. Psikolog/Psikiater

Butuh alat screening awal yang cepat

4. Manajemen RS

Ingin statistik kondisi mental nakes

Ingin meningkatkan kualitas layanan

🟦 5. Journey Pengguna (User Flow)
Pasien:

Buka app → Pilih “Skrining Mental”

Pilih metode: Teks / Suara / Wajah / Tes Standar

Hasil keluar → Skor + Insight

Dapat rekomendasi

Jika risiko sedang/tinggi → diarahkan booking psikolog/psikiater

Tenaga Kesehatan:

Login → Mode Nakes

Pilih skrining cepat (2–3 menit)

Hasil burnout → Insight → Tips coping

(Opsional) Konseling internal RS

Data agregat masuk dashboard manajemen

🟦 6. Requirement Teknis (Technical Requirements)
Frontend

Flutter (Android, iOS, Web)

Fitur voice recording + camera API

UI simple & friendly

Backend

Node.js / Python FastAPI

Model AI untuk:

NLP sentiment mental health

Voice stress analysis

Facial micro-expression detection

Database:

PostgreSQL / MongoDB

AI Models

Text sentiment fine-tuning (mental health dataset)

Voice analysis model (spectrogram CNN/RNN)

Facial expression model (FER+)

Semua dibuat on-device jika memungkinkan → privasi lebih baik.