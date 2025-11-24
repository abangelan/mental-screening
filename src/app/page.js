import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-[family-name:var(--font-sans)]">
      {/* Navbar */}
      <nav className="w-full py-6 px-8 flex justify-between items-center max-w-7xl mx-auto z-10">
        <div className="text-2xl font-bold text-[var(--foreground)] flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-[var(--primary)] flex items-center justify-center text-white font-bold">
            AI
          </div>
          <span className="text-[var(--foreground)]">Mental Screening</span>
        </div>
        <div className="hidden sm:flex gap-6 text-sm font-medium text-[var(--muted-foreground)]">
          <a href="#features" className="hover:text-[var(--foreground)] transition-colors">Fitur</a>
          <a href="#why" className="hover:text-[var(--foreground)] transition-colors">Mengapa AI</a>
          <a href="#about" className="hover:text-[var(--foreground)] transition-colors">Tentang</a>
          <a href="#contact" className="hover:text-[var(--foreground)] transition-colors">Kontak</a>
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center relative z-10">
        {/* Hero Section */}
        <section className="w-full max-w-6xl mx-auto px-6 py-20 sm:py-32 text-center flex flex-col items-center animate-fade-in">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-[var(--secondary)] text-[var(--primary)] text-sm font-semibold tracking-wide border border-[var(--border)]">
            ✨ Deteksi Dini Kesehatan Mental dengan AI. Cepat, Aman, dan Tanpa Stigma.
          </div>

          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-[var(--foreground)] mb-6 leading-[1.1]">
            Solusi Skrining Kesehatan Mental Modern
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-purple-400">
              untuk Semua Orang
            </span>
          </h1>

          <p className="text-xl text-[var(--muted-foreground)] max-w-3xl mx-auto mb-10 leading-relaxed">
            AI Mental Screening Assistant membantu Anda mendeteksi stres, kecemasan, depresi, dan burnout hanya dalam hitungan menit — melalui analisis teks, suara, dan ekspresi wajah. <strong className="text-[var(--foreground)]">Aman, akurat, dan sepenuhnya privat.</strong>
          </p>

          <div className="relative flex gap-4 flex-col sm:flex-row w-full sm:w-auto mt-8">
            <Link href="/dashboard" className="btn btn-primary text-2xl px-12 py-6 shadow-[0_0_20px_rgba(var(--primary),0.5)] hover:shadow-[0_0_50px_rgba(var(--primary),0.8)] transition-all transform hover:-translate-y-2 hover:scale-105 font-extrabold tracking-wider animate-pulse relative z-10">
              MULAI SKRINING SEKARANG
            </Link>
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-center gap-6 text-sm text-[var(--muted-foreground)] opacity-80">
            <div className="flex items-center gap-2">
              <span className="text-[var(--primary)] text-lg">✓</span> Privasi Terjamin
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[var(--primary)] text-lg">✓</span> Hasil Instan
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[var(--primary)] text-lg">✓</span> Berbasis Sains
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[var(--primary)] text-lg">✓</span> On-Device AI
            </div>
          </div>
        </section>

        {/* Why Section */}
        <section id="why" className="w-full bg-[var(--card)]/30 py-24 px-6 border-t border-[var(--border)]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Mengapa Kesehatan Mental Harus Diukur Secara Objektif?</h2>
              <p className="text-lg text-[var(--muted-foreground)] max-w-3xl mx-auto leading-relaxed">
                Kesehatan mental sering terabaikan karena <strong className="text-[var(--foreground)]">stigma</strong> dan <strong className="text-[var(--foreground)]">keterbatasan waktu konsultasi</strong>.
                Dengan teknologi AI, skrining dapat dilakukan lebih cepat, lebih pribadi, dan lebih nyaman — bagi siapa saja, kapan saja.
              </p>
            </div>
          </div>
        </section>

        {/* What is AI Mental Screening */}
        <section className="w-full py-24 px-6 border-t border-[var(--border)]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Apa Itu AI Mental Screening Assistant?</h2>
              <p className="text-lg text-[var(--muted-foreground)] max-w-3xl mx-auto leading-relaxed">
                Aplikasi berbasis kecerdasan buatan yang menganalisis kondisi mental pengguna melalui:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="card p-6 flex items-start gap-4">
                <div className="text-3xl">📝</div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Teks</h3>
                  <p className="text-[var(--muted-foreground)] text-sm">Pengguna menulis tentang perasaan atau keluhan</p>
                </div>
              </div>
              <div className="card p-6 flex items-start gap-4">
                <div className="text-3xl">🎤</div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Suara</h3>
                  <p className="text-[var(--muted-foreground)] text-sm">AI membaca pola suara terkait stres & kecemasan</p>
                </div>
              </div>
              <div className="card p-6 flex items-start gap-4">
                <div className="text-3xl">🙂</div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Ekspresi Wajah (Opsional)</h3>
                  <p className="text-[var(--muted-foreground)] text-sm">Deteksi micro-expression secara real-time</p>
                </div>
              </div>
              <div className="card p-6 flex items-start gap-4">
                <div className="text-3xl">📋</div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Tes Klinis Standar</h3>
                  <p className="text-[var(--muted-foreground)] text-sm">PHQ-9, GAD-7, DASS-21, Burnout Index</p>
                </div>
              </div>
            </div>

            <div className="text-center p-6 bg-[var(--primary)]/10 border border-[var(--primary)]/30 rounded-lg">
              <p className="text-[var(--foreground)] font-medium">
                🔒 Semua diproses dengan teknologi <strong>on-device AI</strong> untuk menjaga kerahasiaan data.
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full bg-[var(--card)]/30 py-24 px-6 border-t border-[var(--border)]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Fitur Unggulan</h2>
              <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto">
                Teknologi AI terdepan untuk analisis kesehatan mental yang komprehensif dan akurat.
              </p>
            </div>

            <div className="space-y-12">
              {/* Feature 1 */}
              <div className="card p-8 hover:border-[var(--primary)] transition-all">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-xl bg-[var(--primary)]/20 text-3xl flex items-center justify-center flex-shrink-0">
                    📝
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">🔹 1. Analisis Teks Berbasis NLP Klinis</h3>
                    <p className="text-[var(--muted-foreground)] leading-relaxed mb-4">
                      AI membaca tulisan Anda dan mendeteksi tanda-tanda emosional seperti <strong className="text-[var(--foreground)]">overthinking, hopelessness, fear, irritability</strong>, dan lainnya.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="card p-8 hover:border-[var(--primary)] transition-all">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-xl bg-[var(--primary)]/20 text-3xl flex items-center justify-center flex-shrink-0">
                    🎤
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">🔹 2. Voice Emotion Analyzer</h3>
                    <p className="text-[var(--muted-foreground)] leading-relaxed mb-4">
                      Cukup bicara selama <strong className="text-[var(--foreground)]">20–40 detik</strong>. AI menganalisis:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-[var(--muted-foreground)] ml-4">
                      <li>Tekanan emosional</li>
                      <li>Tremor suara</li>
                      <li>Ritme bicara</li>
                      <li>Pola napas</li>
                    </ul>
                    <p className="text-[var(--muted-foreground)] mt-4">
                      Hasilnya menunjukkan tingkat stres dan kecemasan Anda.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="card p-8 hover:border-[var(--primary)] transition-all">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-xl bg-[var(--primary)]/20 text-3xl flex items-center justify-center flex-shrink-0">
                    📷
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">🔹 3. Facial Micro-Expression Detection (Opsional)</h3>
                    <p className="text-[var(--muted-foreground)] leading-relaxed mb-4">
                      Dengan kamera depan, AI membaca ekspresi halus yang sering tidak kita sadari:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-[var(--muted-foreground)] ml-4">
                      <li>Kelelahan</li>
                      <li>Ketegangan</li>
                      <li>Tanda depresi ringan</li>
                    </ul>
                    <p className="text-[var(--primary)] font-medium mt-4">
                      🔒 Privasi terjamin — tidak ada video yang disimpan.
                    </p>
                  </div>
                </div>
              </div>



              {/* Feature 5 */}
              <div className="card p-8 hover:border-[var(--primary)] transition-all">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-xl bg-[var(--primary)]/20 text-3xl flex items-center justify-center flex-shrink-0">
                    💡
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">🔹 5. Rekomendasi Personal Berbasis AI</h3>
                    <p className="text-[var(--muted-foreground)] leading-relaxed mb-4">
                      Setelah skrining, pengguna mendapatkan:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-[var(--muted-foreground)] ml-4">
                      <li>Saran coping mechanism</li>
                      <li>Latihan relaksasi</li>
                      <li>Edukasi mental health</li>
                      <li>Rekomendasi konsultasi klinis jika diperlukan</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="w-full py-24 px-6 border-t border-[var(--border)]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-[var(--foreground)]">Tentang Aplikasi</h2>
            <p className="text-lg text-[var(--muted-foreground)] leading-relaxed mb-8">
              AI Mental Screening Assistant adalah inisiatif teknologi kesehatan yang dirancang untuk mendemokratisasi akses terhadap skrining kesehatan mental awal.
              Dikembangkan dengan visi untuk membantu masyarakat Indonesia dalam mendeteksi gejala stres dan kecemasan sedini mungkin menggunakan kecerdasan buatan yang etis dan terpercaya.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="w-full bg-[var(--card)]/30 py-24 px-6 border-t border-[var(--border)]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-10 text-[var(--foreground)]">Hubungi Pengembang</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 rounded-xl border border-[var(--border)] bg-[var(--background)]">
                <div className="text-2xl mb-4">👨‍💻</div>
                <h3 className="font-semibold mb-2">Pengembang</h3>
                <p className="text-[var(--muted-foreground)]">Herlani</p>
              </div>
              <div className="p-6 rounded-xl border border-[var(--border)] bg-[var(--background)]">
                <div className="text-2xl mb-4">📧</div>
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-[var(--muted-foreground)]">bangelan@gmail.com</p>
              </div>
              <div className="p-6 rounded-xl border border-[var(--border)] bg-[var(--background)]">
                <div className="text-2xl mb-4">📱</div>
                <h3 className="font-semibold mb-2">Telepon / WhatsApp</h3>
                <p className="text-[var(--muted-foreground)]">081314127822</p>
                <p className="text-sm text-[var(--muted-foreground)] mt-1">Jakarta, Indonesia</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 text-center text-[var(--muted-foreground)] text-sm border-t border-[var(--border)] bg-[var(--background)]">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2025 Created by Herlani. Hak Cipta Dilindungi.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[var(--foreground)]">Privasi</a>
            <a href="#" className="hover:text-[var(--foreground)]">Syarat & Ketentuan</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
