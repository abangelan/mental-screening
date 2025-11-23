"use client";

import { useUser } from '@/context/UserContext';
import Link from 'next/link';

export default function DashboardPage() {
    const { role } = useUser();

    if (!role) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-8 animate-fade-in max-w-6xl mx-auto px-6 text-center">
                <p className="text-xl text-[var(--muted-foreground)] max-w-3xl mx-auto mb-6 leading-relaxed">
                    AI Mental Screening Assistant membantu Anda mendeteksi stres, kecemasan, depresi, dan burnout hanya dalam hitungan menit — melalui analisis teks, suara, dan ekspresi wajah. <strong className="text-[var(--foreground)]">Aman, akurat, dan sepenuhnya privat.</strong>
                </p>

                <div className="flex gap-4 flex-col sm:flex-row w-full sm:w-auto">
                    <Link href="/dashboard?role=patient" className="btn btn-primary text-lg px-8 py-4 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1">
                        Mulai Skrining Gratis
                    </Link>
                    <Link href="/dashboard?role=nakes" className="btn btn-outline text-lg px-8 py-4">
                        Skrining untuk Tenaga Kesehatan
                    </Link>
                </div>

                <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-[var(--muted-foreground)] opacity-80">
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
            </div>
        );
    }

    return (
        <div className="space-y-10 max-w-5xl mx-auto animate-fade-in">
            <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[var(--border)] pb-6">
                <div>
                    <h1 className="text-4xl font-bold mb-2 text-[var(--foreground)]">
                        {role === 'nakes' ? 'Halo Sejawat Tenaga Kesehatan' : 'Halo, Sobat'}
                    </h1>
                    <p className="text-lg text-[var(--muted-foreground)]">
                        {role === 'nakes'
                            ? 'Pantau kesehatan mental Anda.'
                            : 'Mari periksa kesehatan mental Anda hari ini.'}
                    </p>
                </div>
                <div className="text-sm font-medium px-4 py-2 bg-[var(--secondary)] text-[var(--foreground)] rounded-full border border-[var(--border)]">
                    {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
            </header>

            <div className="grid grid-cols-1 gap-6">
                <h2 className="text-xl font-semibold text-[var(--foreground)]">Alat Skrining</h2>

                <Link href="/screening/text" className="card hover:border-blue-500 transition-all cursor-pointer group flex items-start sm:items-center p-6 gap-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-10 -mt-10 opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
                    <div className="h-16 w-16 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-500/30 group-hover:scale-110 transition-transform flex-shrink-0 z-10">
                        <span className="text-2xl">📝</span>
                    </div>
                    <div className="flex-1 z-10">
                        <h3 className="text-xl font-bold mb-1 text-[var(--foreground)]">Skrining Teks</h3>
                        <p className="text-[var(--muted-foreground)]">
                            Ceritakan perasaan Anda dalam tulisan. AI akan menganalisis sentimen dan emosi.
                        </p>
                    </div>
                    <div className="hidden sm:block z-10">
                        <span className="btn btn-outline text-sm py-2 px-4 group-hover:bg-blue-500 group-hover:text-white group-hover:border-blue-500">Mulai</span>
                    </div>
                </Link>

                <Link href="/screening/voice" className="card hover:border-purple-500 transition-all cursor-pointer group flex items-start sm:items-center p-6 gap-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full -mr-10 -mt-10 opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
                    <div className="h-16 w-16 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center border border-purple-500/30 group-hover:scale-110 transition-transform flex-shrink-0 z-10">
                        <span className="text-2xl">🎙️</span>
                    </div>
                    <div className="flex-1 z-10">
                        <h3 className="text-xl font-bold mb-1 text-[var(--foreground)]">Analisis Suara</h3>
                        <p className="text-[var(--muted-foreground)]">
                            Rekam suara Anda. Kami akan menganalisis nada, intonasi, dan pola bicara.
                        </p>
                    </div>
                    <div className="hidden sm:block z-10">
                        <span className="btn btn-outline text-sm py-2 px-4 group-hover:bg-purple-500 group-hover:text-white group-hover:border-purple-500">Mulai</span>
                    </div>
                </Link>

                <Link href="/screening/face" className="card hover:border-green-500 transition-all cursor-pointer group flex items-start sm:items-center p-6 gap-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full -mr-10 -mt-10 opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
                    <div className="h-16 w-16 rounded-xl bg-green-500/20 text-green-400 flex items-center justify-center border border-green-500/30 group-hover:scale-110 transition-transform flex-shrink-0 z-10">
                        <span className="text-2xl">📷</span>
                    </div>
                    <div className="flex-1 z-10">
                        <h3 className="text-xl font-bold mb-1 text-[var(--foreground)]">Analisis Wajah</h3>
                        <p className="text-[var(--muted-foreground)]">
                            Deteksi ekspresi mikro wajah untuk menilai tingkat kelelahan dan stres.
                        </p>
                    </div>
                    <div className="hidden sm:block z-10">
                        <span className="btn btn-outline text-sm py-2 px-4 group-hover:bg-green-500 group-hover:text-white group-hover:border-green-500">Mulai</span>
                    </div>
                </Link>

                {role === 'nakes' && (
                    <Link href="/screening/burnout" className="card hover:border-red-500 transition-all cursor-pointer group flex items-start sm:items-center p-6 gap-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full -mr-10 -mt-10 opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
                        <div className="h-16 w-16 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center border border-red-500/30 group-hover:scale-110 transition-transform flex-shrink-0 z-10">
                            <span className="text-2xl">🔥</span>
                        </div>
                        <div className="flex-1 z-10">
                            <h3 className="text-xl font-bold mb-1 text-[var(--foreground)]">Cek Burnout</h3>
                            <p className="text-[var(--muted-foreground)]">
                                Skrining khusus indikator kelelahan kerja (burnout) pada tenaga medis.
                            </p>
                        </div>
                        <div className="hidden sm:block z-10">
                            <span className="btn btn-outline text-sm py-2 px-4 group-hover:bg-red-500 group-hover:text-white group-hover:border-red-500">Cek</span>
                        </div>
                    </Link>
                )}

                {role === 'patient' && (
                    <Link href="/screening/test/standard" className="card hover:border-green-500 transition-all cursor-pointer group flex items-start sm:items-center p-6 gap-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full -mr-10 -mt-10 opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
                        <div className="h-16 w-16 rounded-xl bg-green-500/20 text-green-400 flex items-center justify-center border border-green-500/30 group-hover:scale-110 transition-transform flex-shrink-0 z-10">
                            <span className="text-2xl">📋</span>
                        </div>
                        <div className="flex-1 z-10">
                            <h3 className="text-xl font-bold mb-1 text-[var(--foreground)]">Tes Standar</h3>
                            <p className="text-[var(--muted-foreground)]">
                                Kuesioner klinis standar seperti PHQ-9 (Depresi) dan GAD-7 (Kecemasan).
                            </p>
                        </div>
                        <div className="hidden sm:block z-10">
                            <span className="btn btn-outline text-sm py-2 px-4 group-hover:bg-green-500 group-hover:text-white group-hover:border-green-500">Lihat</span>
                        </div>
                    </Link>
                )}
            </div>

            {/* Recent Activity / Stats Placeholder */}
            <section className="mt-12 pt-8 border-t border-[var(--border)]">
                <h2 className="text-xl font-semibold mb-6 text-[var(--foreground)]">Aktivitas Terakhir</h2>
                <div className="card p-10 text-center text-[var(--muted-foreground)] border-dashed bg-[var(--background)]">
                    <div className="text-4xl mb-4 opacity-20">📅</div>
                    <p>Belum ada riwayat skrining.</p>
                    <p className="text-sm mt-2">Mulai pemeriksaan pertama Anda hari ini untuk melacak kesehatan mental Anda.</p>
                </div>
            </section>
        </div>
    );
}
