"use client";

import { useState } from 'react';
import { analyzeText } from '@/lib/mockAI';
import Link from 'next/link';

import NavigationControls from '@/components/ui/NavigationControls';

export default function TextScreeningPage() {
    const [text, setText] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState(null);

    const handleAnalyze = async () => {
        if (!text.trim()) return;
        setIsAnalyzing(true);
        try {
            const data = await analyzeText(text);
            setResult(data);
        } catch (error) {
            console.error("Analysis failed", error);
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <header>
                <h1 className="text-3xl font-bold mb-2">Skrining Teks</h1>
                <p className="text-[var(--muted-foreground)]">
                    Bagikan pikiran, perasaan, atau apa yang ada di benak Anda. AI kami akan menganalisis sentimen dan penanda emosionalnya.
                </p>
            </header>

            <div className="card">
                <textarea
                    className="w-full h-48 p-4 rounded-md bg-[var(--background)] border border-[var(--border)] focus:ring-2 focus:ring-[var(--primary)] outline-none resize-none transition-all"
                    placeholder="Saya merasa..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    disabled={isAnalyzing}
                ></textarea>
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={handleAnalyze}
                        disabled={isAnalyzing || !text.trim()}
                        className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isAnalyzing ? 'Menganalisis...' : 'Analisis Teks'}
                    </button>
                </div>
            </div>

            {result && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <ScoreCard label="Stres" score={result.stress} color="red" />
                        <ScoreCard label="Kecemasan" score={result.anxiety} color="orange" />
                        <ScoreCard label="Depresi" score={result.depression} color="blue" />
                        <ScoreCard label="Burnout" score={result.burnout} color="purple" />
                    </div>

                    <div className="card bg-[var(--card)] border-[var(--border)]">
                        <h3 className="text-xl font-semibold mb-4">Insight AI</h3>
                        <div className="space-y-4">
                            <div>
                                <span className="text-sm font-medium text-[var(--muted-foreground)]">Kata Kunci Terdeteksi:</span>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {result.keywords.length > 0 ? (
                                        result.keywords.map((k, i) => (
                                            <span key={i} className="px-2 py-1 bg-[var(--muted)] rounded text-xs font-medium">
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
                                        <div key={i} className="border-l-4 border-[var(--primary)] pl-4">
                                            <h4 className="font-semibold text-[var(--foreground)] mb-2">{rec.category}</h4>
                                            <ul className="list-disc list-inside space-y-2 text-sm text-[var(--muted-foreground)]">
                                                {rec.items.map((item, j) => (
                                                    <li key={j} className="leading-relaxed">{item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 p-4 bg-[var(--muted)] rounded-lg">
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

            <NavigationControls />
        </div>
    );
}

function ScoreCard({ label, score, color }) {
    // Simple color mapping for demo
    const getColor = (c) => {
        if (c === 'red') return 'text-red-600 bg-red-50 border-red-100';
        if (c === 'orange') return 'text-orange-600 bg-orange-50 border-orange-100';
        if (c === 'blue') return 'text-blue-600 bg-blue-50 border-blue-100';
        return 'text-purple-600 bg-purple-50 border-purple-100';
    };

    return (
        <div className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center ${getColor(color)}`}>
            <span className="text-3xl font-bold mb-1">{score}%</span>
            <span className="text-xs font-medium uppercase tracking-wider opacity-80">{label}</span>
        </div>
    );
}
