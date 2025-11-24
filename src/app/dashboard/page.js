"use client";

import { useUser } from '@/context/UserContext';
import Link from 'next/link';

export default function DashboardPage() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-10 max-w-5xl mx-auto animate-fade-in py-10">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-[var(--foreground)]">
                    Pilih Metode Skrining
                </h1>
                <p className="text-xl text-[var(--muted-foreground)] max-w-2xl mx-auto">
                    Pilih cara yang paling nyaman bagi Anda untuk memeriksa kondisi kesehatan mental Anda saat ini.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full px-6">
                <Link href="/screening/text" className="card hover:border-blue-500 transition-all cursor-pointer group flex items-start sm:items-center p-8 gap-6 relative overflow-hidden hover:shadow-lg">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-10 -mt-10 opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
                    <div className="h-20 w-20 rounded-2xl bg-blue-500/20 text-blue-500 flex items-center justify-center border border-blue-500/30 group-hover:scale-110 transition-transform flex-shrink-0 z-10">
                        <span className="text-4xl">📝</span>
                    </div>
                    <div className="flex-1 z-10">
                        <h3 className="text-2xl font-bold mb-2 text-[var(--foreground)]">Skrining Teks</h3>
                        <p className="text-[var(--muted-foreground)]">
                            Ceritakan perasaan Anda lewat tulisan.
                        </p>
                    </div>
                </Link>

                <Link href="/screening/voice" className="card hover:border-purple-500 transition-all cursor-pointer group flex items-start sm:items-center p-8 gap-6 relative overflow-hidden hover:shadow-lg">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full -mr-10 -mt-10 opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
                    <div className="h-20 w-20 rounded-2xl bg-purple-500/20 text-purple-500 flex items-center justify-center border border-purple-500/30 group-hover:scale-110 transition-transform flex-shrink-0 z-10">
                        <span className="text-4xl">🎙️</span>
                    </div>
                    <div className="flex-1 z-10">
                        <h3 className="text-2xl font-bold mb-2 text-[var(--foreground)]">Analisis Suara</h3>
                        <p className="text-[var(--muted-foreground)]">
                            Rekam suara untuk deteksi emosi.
                        </p>
                    </div>
                </Link>

                <Link href="/screening/face" className="card hover:border-green-500 transition-all cursor-pointer group flex items-start sm:items-center p-8 gap-6 relative overflow-hidden hover:shadow-lg">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full -mr-10 -mt-10 opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
                    <div className="h-20 w-20 rounded-2xl bg-green-500/20 text-green-500 flex items-center justify-center border border-green-500/30 group-hover:scale-110 transition-transform flex-shrink-0 z-10">
                        <span className="text-4xl">📷</span>
                    </div>
                    <div className="flex-1 z-10">
                        <h3 className="text-2xl font-bold mb-2 text-[var(--foreground)]">Analisis Wajah</h3>
                        <p className="text-[var(--muted-foreground)]">
                            Deteksi ekspresi mikro via kamera.
                        </p>
                    </div>
                </Link>

                <Link href="/screening/test/standard" className="card hover:border-orange-500 transition-all cursor-pointer group flex items-start sm:items-center p-8 gap-6 relative overflow-hidden hover:shadow-lg">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full -mr-10 -mt-10 opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
                    <div className="h-20 w-20 rounded-2xl bg-orange-500/20 text-orange-500 flex items-center justify-center border border-orange-500/30 group-hover:scale-110 transition-transform flex-shrink-0 z-10">
                        <span className="text-4xl">📋</span>
                    </div>
                    <div className="flex-1 z-10">
                        <h3 className="text-2xl font-bold mb-2 text-[var(--foreground)]">Kuesioner</h3>
                        <p className="text-[var(--muted-foreground)]">
                            Tes klinis DASS-21 (Stres, Cemas, Depresi).
                        </p>
                    </div>
                </Link>
            </div>
        </div>
    );
}
