'use client';

import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

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
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex gap-6 text-sm font-medium text-[var(--muted-foreground)]">
            <a href="#features" className="hover:text-[var(--foreground)] transition-colors">Fitur</a>
            <a href="#why" className="hover:text-[var(--foreground)] transition-colors">Mengapa AI</a>
            <a href="#about" className="hover:text-[var(--foreground)] transition-colors">Tentang</a>
            <a href="#contact" className="hover:text-[var(--foreground)] transition-colors">Kontak</a>
          </div>
          <ThemeToggle />
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
              {/* Text Analysis */}
              <div className="group card p-8 hover:shadow-xl transition-all duration-300">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl mb-2 text-[var(--foreground)]">Analisis Teks</h3>
                    <p className="text-[var(--muted-foreground)] leading-relaxed">Pengguna menulis tentang perasaan atau keluhan mereka untuk dianalisis oleh AI</p>
                  </div>
                </div>
              </div>

              {/* Voice Analysis */}
              <div className="group card p-8 hover:shadow-xl transition-all duration-300">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl mb-2 text-[var(--foreground)]">Analisis Suara</h3>
                    <p className="text-[var(--muted-foreground)] leading-relaxed">AI membaca pola suara terkait stres dan kecemasan dari rekaman audio</p>
                  </div>
                </div>
              </div>

              {/* Facial Expression */}
              <div className="group card p-8 hover:shadow-xl transition-all duration-300">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl mb-2 text-[var(--foreground)]">Ekspresi Wajah <span className="text-sm font-normal text-[var(--muted-foreground)]">(Opsional)</span></h3>
                    <p className="text-[var(--muted-foreground)] leading-relaxed">Deteksi micro-expression secara real-time melalui kamera</p>
                  </div>
                </div>
              </div>

              {/* Clinical Tests */}
              <div className="group card p-8 hover:shadow-xl transition-all duration-300">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl mb-2 text-[var(--foreground)]">Tes Klinis Standar</h3>
                    <p className="text-[var(--muted-foreground)] leading-relaxed">PHQ-9, GAD-7, DASS-21, dan Burnout Index yang tervalidasi</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden text-center p-8 bg-gradient-to-r from-[var(--primary)]/10 via-[var(--primary)]/5 to-[var(--primary)]/10 border border-[var(--primary)]/20 rounded-xl">
              <div className="relative z-10 flex items-center justify-center gap-3">
                <svg className="w-6 h-6 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <p className="text-[var(--foreground)] font-semibold">
                  Semua diproses dengan teknologi <strong>on-device AI</strong> untuk menjaga kerahasiaan data Anda
                </p>
              </div>
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Feature 1 */}
              <div className="group card p-8 hover:shadow-2xl transition-all duration-300 border-l-4 border-l-transparent hover:border-l-blue-500">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      1
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3 text-[var(--foreground)]">Analisis Teks Berbasis NLP Klinis</h3>
                    <p className="text-[var(--muted-foreground)] leading-relaxed mb-4">
                      AI membaca tulisan Anda dan mendeteksi tanda-tanda emosional seperti <strong className="text-[var(--foreground)]">overthinking, hopelessness, fear, irritability</strong>, dan lainnya menggunakan Natural Language Processing yang terlatih secara klinis.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="group card p-8 hover:shadow-2xl transition-all duration-300 border-l-4 border-l-transparent hover:border-l-purple-500">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      2
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3 text-[var(--foreground)]">Voice Emotion Analyzer</h3>
                    <p className="text-[var(--muted-foreground)] leading-relaxed mb-4">
                      Cukup bicara selama <strong className="text-[var(--foreground)]">20–40 detik</strong>. AI menganalisis berbagai aspek suara Anda:
                    </p>
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                        Tekanan emosional
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                        Tremor suara
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                        Ritme bicara
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                        Pola napas
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="group card p-8 hover:shadow-2xl transition-all duration-300 border-l-4 border-l-transparent hover:border-l-green-500">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      3
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3 text-[var(--foreground)]">Facial Micro-Expression Detection</h3>
                    <p className="text-sm text-[var(--muted-foreground)] mb-3 italic">Opsional</p>
                    <p className="text-[var(--muted-foreground)] leading-relaxed mb-4">
                      Dengan kamera depan, AI membaca ekspresi halus yang sering tidak kita sadari untuk mendeteksi tanda-tanda kelelahan, ketegangan, dan depresi ringan.
                    </p>
                    <div className="flex items-center gap-2 mt-4 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                      <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <p className="text-sm text-green-700 dark:text-green-400 font-medium">Privasi terjamin — tidak ada video yang disimpan</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="group card p-8 hover:shadow-2xl transition-all duration-300 border-l-4 border-l-transparent hover:border-l-orange-500">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      4
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3 text-[var(--foreground)]">Rekomendasi Personal Berbasis AI</h3>
                    <p className="text-[var(--muted-foreground)] leading-relaxed mb-4">
                      Setelah skrining, Anda mendapatkan rekomendasi yang dipersonalisasi:
                    </p>
                    <div className="space-y-2 mt-4">
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-[var(--muted-foreground)]">Saran coping mechanism yang sesuai</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-[var(--muted-foreground)]">Latihan relaksasi dan mindfulness</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-[var(--muted-foreground)]">Edukasi kesehatan mental</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-[var(--muted-foreground)]">Rekomendasi konsultasi profesional jika diperlukan</span>
                      </div>
                    </div>
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
