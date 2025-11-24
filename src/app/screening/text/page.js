"use client";

import { useState, useEffect } from 'react';
import { analyzeText } from '@/lib/mockAI';
import Link from 'next/link';

import NavigationControls from '@/components/ui/NavigationControls';

import PrivacyNotice from '@/components/ui/PrivacyNotice';

export default function TextScreeningPage() {
    const [text, setText] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState(null);
    const [loadingPhase, setLoadingPhase] = useState(0); // 0: idle, 1: scanning, 2: processing, 3: finalizing

    // Simulate multi-step AI analysis for better UX
    useEffect(() => {
        let interval;
        if (isAnalyzing) {
            setLoadingPhase(1);
            interval = setInterval(() => {
                setLoadingPhase(prev => (prev < 3 ? prev + 1 : prev));
            }, 800);
        } else {
            setLoadingPhase(0);
        }
        return () => clearInterval(interval);
    }, [isAnalyzing]);

    const handleAnalyze = async () => {
        if (!text.trim()) return;
        setIsAnalyzing(true);
        setResult(null);

        // Artificial delay to show off the loading animation
        // In a real app, this would just be the API call time
        try {
            // Wait a bit to let the user see the "Scanning" phase
            await new Promise(r => setTimeout(r, 2500));

            const data = await analyzeText(text);
            setResult(data);
        } catch (error) {
            console.error("Analysis failed", error);
        } finally {
            setIsAnalyzing(false);
        }
    };

    const getLoadingText = () => {
        switch (loadingPhase) {
            case 1: return "Menganalisis pola bahasa...";
            case 2: return "Mendeteksi sentimen emosi...";
            case 3: return "Menyusun rekomendasi...";
            default: return "Menganalisis...";
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <NavigationControls />
            <PrivacyNotice />

            <header>
                <h1 className="text-3xl font-bold mb-2">Skrining Teks</h1>
                <p className="text-[var(--muted-foreground)]">
                    Ceritakan apa yang Anda rasakan. AI kami akan menganalisis sentimen dan emosi dari tulisan Anda.
                </p>
            </header>

            <div className="card relative overflow-hidden">
                <textarea
                    className="w-full h-48 p-4 rounded-md bg-[var(--background)] border border-[var(--border)] focus:ring-2 focus:ring-[var(--primary)] outline-none resize-none transition-all disabled:opacity-50"
                    placeholder="Saya merasa..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    disabled={isAnalyzing}
                ></textarea>

                {/* Loading Overlay */}
                {isAnalyzing && (
                    <div className="absolute inset-0 bg-[var(--card)]/90 backdrop-blur-sm flex flex-col items-center justify-center z-10 animate-in fade-in duration-300">
                        <div className="w-16 h-16 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="text-[var(--primary)] font-medium animate-pulse">{getLoadingText()}</p>
                    </div>
                )}

                <div className="mt-4 flex justify-end">
                    <button
                        onClick={handleAnalyze}
                        disabled={isAnalyzing || !text.trim()}
                        className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                    >
                        {isAnalyzing ? 'Sedang Memproses...' : 'Analisis Teks'}
                    </button>
                </div>
            </div>

            {result && (
                <div className="space-y-6">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <ScoreCard label="Stres" score={result.stress} color="red" delay={0} />
                        <ScoreCard label="Kecemasan" score={result.anxiety} color="orange" delay={100} />
                        <ScoreCard label="Depresi" score={result.depression} color="blue" delay={200} />
                        <ScoreCard label="Burnout" score={result.burnout} color="purple" delay={300} />
                    </div>

                    <div className="card bg-[var(--card)] border-[var(--border)] animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500 fill-mode-backwards">
                        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <span className="text-2xl">🤖</span> Insight AI
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <span className="text-sm font-medium text-[var(--muted-foreground)]">Kata Kunci Terdeteksi:</span>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {result.keywords.length > 0 ? (
                                        result.keywords.map((k, i) => (
                                            <span key={i} className="px-2 py-1 bg-[var(--muted)] rounded text-xs font-medium animate-in zoom-in duration-300" style={{ animationDelay: `${600 + (i * 100)}ms`, animationFillMode: 'backwards' }}>
                                                {k}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-sm text-[var(--muted-foreground)]">Tidak ada yang terdeteksi</span>
                                    )}
                                </div>
                            </div>

                            <div>
                                <span className="text-sm font-medium text-[var(--muted-foreground)]">Rekomendasi & Saran:</span>
                                <div className="mt-4 space-y-6">
                                    {result.recommendations.map((rec, i) => (
                                        <div key={i} className="border-l-4 border-[var(--primary)] pl-4 animate-in slide-in-from-left-4 duration-500" style={{ animationDelay: `${800 + (i * 200)}ms`, animationFillMode: 'backwards' }}>
                                            <h4 className="font-semibold text-[var(--foreground)] mb-2">{rec.category}</h4>
                                            <ul className="list-disc list-inside space-y-2 text-sm text-[var(--muted-foreground)]">
                                                {rec.items.map((item, j) => (
                                                    <li key={j} className="leading-relaxed">{item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 p-4 bg-[var(--muted)] rounded-lg animate-in fade-in duration-1000 delay-1000 fill-mode-backwards">
                                    <p className="text-sm text-[var(--muted-foreground)]">
                                        <strong>Catatan:</strong> Hasil ini adalah alat skrining awal, bukan diagnosis medis.
                                        Jika Anda mengalami gejala yang mengganggu kehidupan sehari-hari, sangat disarankan untuk
                                        berkonsultasi dengan profesional kesehatan mental.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function ScoreCard({ label, score, color, delay }) {
    // Simple color mapping for demo
    const getColor = (c) => {
        if (c === 'red') return 'text-red-500 bg-red-500/10 border-red-500/20';
        if (c === 'orange') return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
        if (c === 'blue') return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
        return 'text-purple-500 bg-purple-500/10 border-purple-500/20';
    };

    return (
        <div
            className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center ${getColor(color)} animate-in fade-in zoom-in duration-500 fill-mode-backwards`}
            style={{ animationDelay: `${delay}ms` }}
        >
            <span className="text-3xl font-bold mb-1">{score}%</span>
            <span className="text-xs font-medium uppercase tracking-wider opacity-80">{label}</span>
        </div>
    );
}
