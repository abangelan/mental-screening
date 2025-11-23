"use client";

import { useState } from 'react';
import Link from 'next/link';

const QUESTIONS = [
    "Saya merasa terkuras secara emosional dari pekerjaan saya.",
    "Saya merasa habis-habisan di akhir hari kerja.",
    "Saya merasa lelah ketika bangun di pagi hari dan harus menghadapi hari lain di tempat kerja.",
    "Bekerja dengan orang sepanjang hari benar-benar melelahkan bagi saya.",
    "Saya merasa burnout karena pekerjaan saya.",
    "Saya merasa saya bekerja terlalu keras pada pekerjaan saya.",
    "Saya merasa pekerjaan saya menghancurkan saya."
];

import NavigationControls from '@/components/ui/NavigationControls';

export default function BurnoutScreeningPage() {
    const [answers, setAnswers] = useState({});
    const [result, setResult] = useState(null);

    const handleAnswer = (index, value) => {
        setAnswers(prev => ({ ...prev, [index]: value }));
    };

    const calculateScore = () => {
        const total = Object.values(answers).reduce((a, b) => a + b, 0);
        const maxScore = QUESTIONS.length * 6; // 0-6 scale usually, let's say 0-6
        const percentage = Math.round((total / maxScore) * 100);

        let risk = 'Rendah';
        if (percentage > 40) risk = 'Sedang';
        if (percentage > 70) risk = 'Tinggi';

        setResult({ score: percentage, risk });
    };

    const isComplete = QUESTIONS.every((_, i) => answers[i] !== undefined);

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <header>
                <h1 className="text-3xl font-bold mb-2">Penilaian Burnout</h1>
                <p className="text-[var(--muted-foreground)]">
                    Skrining khusus untuk profesional kesehatan guna mendeteksi tanda-tanda awal burnout.
                    Silakan jawab berdasarkan perasaan Anda selama 7 hari terakhir.
                </p>
            </header>

            {!result ? (
                <div className="space-y-6">
                    {QUESTIONS.map((q, i) => (
                        <div key={i} className="card p-6">
                            <p className="font-medium mb-4">{i + 1}. {q}</p>
                            <div className="flex flex-wrap gap-2">
                                {[
                                    { val: 0, label: "Tidak pernah" },
                                    { val: 1, label: "Beberapa kali setahun" },
                                    { val: 2, label: "Sebulan sekali" },
                                    { val: 3, label: "Beberapa kali sebulan" },
                                    { val: 4, label: "Seminggu sekali" },
                                    { val: 5, label: "Beberapa kali seminggu" },
                                    { val: 6, label: "Setiap hari" }
                                ].map((opt) => (
                                    <button
                                        key={opt.val}
                                        onClick={() => handleAnswer(i, opt.val)}
                                        className={`px-3 py-2 text-xs sm:text-sm rounded-md border transition-colors ${answers[i] === opt.val
                                            ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                                            : 'hover:bg-[var(--muted)] border-[var(--border)]'
                                            }`}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}

                    <div className="flex justify-end">
                        <button
                            onClick={calculateScore}
                            disabled={!isComplete}
                            className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Analisis Risiko Burnout
                        </button>
                    </div>
                </div>
            ) : (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
                    <div className="card text-center py-10 bg-[var(--card)] border-[var(--border)]">
                        <h3 className="text-lg text-[var(--muted-foreground)] mb-2">Tingkat Risiko Burnout</h3>
                        <div className={`text-5xl font-bold mb-4 ${result.risk === 'Tinggi' ? 'text-red-600' :
                            result.risk === 'Sedang' ? 'text-orange-600' : 'text-green-600'
                            }`}>
                            {result.risk}
                        </div>
                        <div className="text-2xl font-medium text-[var(--muted-foreground)]">
                            Skor: {result.score}/100
                        </div>

                        <div className="mt-8 p-4 bg-[var(--muted)] rounded-lg max-w-lg mx-auto text-left">
                            <h4 className="font-semibold mb-2">Rekomendasi:</h4>
                            <ul className="list-disc list-inside space-y-2 text-sm">
                                {result.risk === 'Tinggi' && (
                                    <>
                                        <li>Pertimbangkan untuk segera berkonsultasi dengan profesional kesehatan mental.</li>
                                        <li>Ambil cuti jika memungkinkan untuk pemulihan.</li>
                                        <li>Diskusikan beban kerja dengan atasan Anda.</li>
                                    </>
                                )}
                                {result.risk === 'Sedang' && (
                                    <>
                                        <li>Lakukan teknik pengurangan stres setiap hari.</li>
                                        <li>Pastikan Anda mendapatkan tidur dan nutrisi yang cukup.</li>
                                        <li>Pantau gejala Anda dengan cermat.</li>
                                    </>
                                )}
                                {result.risk === 'Rendah' && (
                                    <>
                                        <li>Terus pertahankan keseimbangan kehidupan kerja yang sehat.</li>
                                        <li>Periksa kesehatan mental Anda secara teratur.</li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className="flex justify-center gap-4">
                        <button onClick={() => { setResult(null); setAnswers({}); }} className="btn btn-outline">Ulangi</button>
                    </div>
                </div>
            )}

            <NavigationControls />
        </div>
    );
}
