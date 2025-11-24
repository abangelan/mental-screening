"use client";

import { useState, useEffect } from 'react';
import NavigationControls from '@/components/ui/NavigationControls';
import Link from 'next/link';

// --- DATA: QUESTIONS ---
const DASS_QUESTIONS = [
    { text: "Saya merasa sulit untuk tenang", category: 'stress', source: 'dass' },
    { text: "Saya merasa mulut saya kering", category: 'anxiety', source: 'dass' },
    { text: "Saya tidak bisa merasakan perasaan positif sama sekali", category: 'depression', source: 'dass' },
    { text: "Saya mengalami kesulitan bernapas (misalnya, napas cepat, kehabisan napas)", category: 'anxiety', source: 'dass' },
    { text: "Saya merasa sulit untuk memulai melakukan sesuatu", category: 'depression', source: 'dass' },
    { text: "Saya cenderung bereaksi berlebihan terhadap situasi", category: 'stress', source: 'dass' },
    { text: "Saya mengalami gemetar (misalnya, di tangan)", category: 'anxiety', source: 'dass' },
    { text: "Saya merasa menggunakan banyak energi gugup", category: 'stress', source: 'dass' },
    { text: "Saya khawatir tentang situasi di mana saya mungkin panik dan membuat diri saya terlihat bodoh", category: 'anxiety', source: 'dass' },
    { text: "Saya merasa tidak ada yang bisa dinanti-nantikan", category: 'depression', source: 'dass' },
    { text: "Saya merasa gelisah", category: 'stress', source: 'dass' },
    { text: "Saya merasa sulit untuk bersantai", category: 'stress', source: 'dass' },
    { text: "Saya merasa sedih dan tertekan", category: 'depression', source: 'dass' },
    { text: "Saya tidak toleran terhadap apa pun yang menghalangi saya untuk menyelesaikan apa yang sedang saya lakukan", category: 'stress', source: 'dass' },
    { text: "Saya merasa hampir panik", category: 'anxiety', source: 'dass' },
    { text: "Saya tidak bisa antusias tentang apa pun", category: 'depression', source: 'dass' },
    { text: "Saya merasa tidak berharga sebagai pribadi", category: 'depression', source: 'dass' },
    { text: "Saya merasa agak sensitif", category: 'stress', source: 'dass' },
    { text: "Saya menyadari aksi jantung saya tanpa melakukan aktivitas fisik", category: 'anxiety', source: 'dass' },
    { text: "Saya merasa takut tanpa alasan yang jelas", category: 'anxiety', source: 'dass' },
    { text: "Saya merasa hidup tidak berarti", category: 'depression', source: 'dass' }
];

// Combine all questions
const ALL_QUESTIONS = [...DASS_QUESTIONS];
const ITEMS_PER_PAGE = 10;

import PrivacyNotice from '@/components/ui/PrivacyNotice';

// ... (DASS_QUESTIONS and ALL_QUESTIONS remain the same)

export default function UnifiedScreeningPage() {
    const [currentPage, setCurrentPage] = useState(0);
    const [answers, setAnswers] = useState({});
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState(null);

    const totalPages = Math.ceil(ALL_QUESTIONS.length / ITEMS_PER_PAGE);
    const currentQuestions = ALL_QUESTIONS.slice(
        currentPage * ITEMS_PER_PAGE,
        (currentPage + 1) * ITEMS_PER_PAGE
    );

    const isPageComplete = currentQuestions.every((_, index) => {
        const globalIndex = (currentPage * ITEMS_PER_PAGE) + index;
        return answers[globalIndex] !== undefined;
    });

    const handleAnswer = (index, value) => {
        setAnswers(prev => ({ ...prev, [index]: value }));
    };

    const handleNext = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(prev => prev + 1);
            window.scrollTo(0, 0);
        } else {
            calculateResults();
        }
    };

    const handlePrev = () => {
        if (currentPage > 0) {
            setCurrentPage(prev => prev - 1);
            window.scrollTo(0, 0);
        }
    };

    const calculateResults = async () => {
        setIsAnalyzing(true);

        // Simulate analysis delay for "AI" feel
        await new Promise(r => setTimeout(r, 2000));

        let scores = {
            depression: 0, anxiety: 0, stress: 0
        };

        ALL_QUESTIONS.forEach((q, i) => {
            const val = answers[i] || 0;
            if (scores[q.category] !== undefined) {
                scores[q.category] += val;
            }
        });

        // DASS-21 adjustment (x2)
        scores.depression *= 2;
        scores.anxiety *= 2;
        scores.stress *= 2;

        const getDASSLevel = (score, type) => {
            if (type === 'depression') return score >= 28 ? 'Sangat Berat' : score >= 14 ? 'Sedang/Berat' : 'Normal';
            if (type === 'anxiety') return score >= 20 ? 'Sangat Berat' : score >= 10 ? 'Sedang/Berat' : 'Normal';
            return score >= 34 ? 'Sangat Berat' : score >= 19 ? 'Sedang/Berat' : 'Normal';
        };

        setResult({
            dass: {
                depression: { score: scores.depression, level: getDASSLevel(scores.depression, 'depression') },
                anxiety: { score: scores.anxiety, level: getDASSLevel(scores.anxiety, 'anxiety') },
                stress: { score: scores.stress, level: getDASSLevel(scores.stress, 'stress') }
            }
        });
        setIsAnalyzing(false);
    };

    if (result) {
        return <ResultView result={result} onReset={() => { setResult(null); setAnswers({}); setCurrentPage(0); }} />;
    }

    if (isAnalyzing) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <div className="w-16 h-16 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin mb-6"></div>
                <h2 className="text-xl font-bold animate-pulse">Menganalisis Jawaban Anda...</h2>
                <p className="text-[var(--muted-foreground)] mt-2">Menghitung skor kesehatan mental komprehensif</p>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto space-y-6 pb-20">
            <NavigationControls />
            <PrivacyNotice />

            <header className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Kuesioner Kesehatan Mental</h1>
                <p className="text-[var(--muted-foreground)]">
                    Kuesioner ini menggunakan standar DASS-21 untuk mengukur tingkat Depresi, Kecemasan, dan Stres.
                    Mohon jawab dengan jujur sesuai kondisi Anda.
                </p>
            </header>

            {/* Progress Bar */}
            <div className="w-full bg-[var(--muted)] h-2 rounded-full overflow-hidden mb-8">
                <div
                    className="bg-[var(--primary)] h-full transition-all duration-500 ease-out"
                    style={{ width: `${((currentPage + 1) / totalPages) * 100}%` }}
                ></div>
            </div>

            <div className="space-y-8">
                {currentQuestions.map((q, index) => {
                    const globalIndex = (currentPage * ITEMS_PER_PAGE) + index;
                    const options = [
                        { val: 0, label: "Tidak pernah" },
                        { val: 1, label: "Kadang-kadang" },
                        { val: 2, label: "Sering" },
                        { val: 3, label: "Hampir selalu" }
                    ];

                    return (
                        <div key={globalIndex} className="card p-6 animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${index * 50}ms` }}>
                            <p className="font-medium text-lg mb-4">
                                <span className="text-[var(--muted-foreground)] mr-2">{globalIndex + 1}.</span>
                                {q.text}
                            </p>
                            <div className="grid gap-2 grid-cols-2 sm:grid-cols-4">
                                {options.map((opt) => (
                                    <button
                                        key={opt.val}
                                        onClick={() => handleAnswer(globalIndex, opt.val)}
                                        className={`p-2 text-sm rounded-md border transition-all ${answers[globalIndex] === opt.val
                                            ? 'bg-[var(--primary)] text-white border-[var(--primary)] shadow-md scale-[1.02]'
                                            : 'hover:bg-[var(--muted)] border-[var(--border)]'
                                            }`}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Footer Controls */}
            <div className="fixed bottom-0 left-0 w-full bg-[var(--card)]/80 backdrop-blur-lg border-t border-[var(--border)] p-4 z-40">
                <div className="max-w-3xl mx-auto flex justify-between items-center">
                    <button
                        onClick={handlePrev}
                        disabled={currentPage === 0}
                        className="btn btn-outline disabled:opacity-0"
                    >
                        ← Sebelumnya
                    </button>

                    <span className="text-sm font-medium text-[var(--muted-foreground)]">
                        Halaman {currentPage + 1} dari {totalPages}
                    </span>

                    <button
                        onClick={handleNext}
                        disabled={!isPageComplete}
                        className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {currentPage === totalPages - 1 ? 'Selesai & Analisis' : 'Selanjutnya →'}
                    </button>
                </div>
            </div>
        </div>
    );
}

function ResultView({ result, onReset }) {
    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
            <NavigationControls />

            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">Hasil Analisis Komprehensif</h1>
                <p className="text-[var(--muted-foreground)]">Berdasarkan jawaban Anda pada kuesioner standar.</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {/* DASS Results */}
                <div className="card space-y-6">
                    <h3 className="text-xl font-semibold border-b border-[var(--border)] pb-2">Kesehatan Mental Umum</h3>
                    <div className="space-y-4">
                        <ResultRow label="Tingkat Stres" level={result.dass.stress.level} score={result.dass.stress.score} />
                        <ResultRow label="Tingkat Kecemasan" level={result.dass.anxiety.level} score={result.dass.anxiety.score} />
                        <ResultRow label="Tingkat Depresi" level={result.dass.depression.level} score={result.dass.depression.score} />
                    </div>
                </div>
            </div>

            <div className="card bg-[var(--card)] border-[var(--border)]">
                <h3 className="text-xl font-semibold mb-4">Rekomendasi & Tindakan Lanjut</h3>
                <div className="space-y-6">
                    <div className="border-l-4 border-[var(--primary)] pl-4">
                        <h4 className="font-semibold text-[var(--foreground)] mb-2">Manajemen Diri</h4>
                        <ul className="list-disc list-inside space-y-2 text-sm text-[var(--muted-foreground)]">
                            <li>Praktikkan mindfulness atau meditasi selama 10 menit setiap hari.</li>
                            <li>Pastikan tidur cukup (7-8 jam) dan teratur.</li>
                            <li>Lakukan aktivitas fisik ringan seperti berjalan kaki setidaknya 30 menit.</li>
                        </ul>
                    </div>

                    {(result.dass.stress.level === 'Sangat Berat' || result.dass.depression.level === 'Sangat Berat' || result.dass.anxiety.level === 'Sangat Berat') && (
                        <div className="border-l-4 border-red-500 pl-4 bg-red-50/50 p-2 rounded-r-md">
                            <h4 className="font-semibold text-red-700 mb-2">⚠️ Perhatian Khusus</h4>
                            <p className="text-sm text-red-600 mb-2">
                                Skor Anda menunjukkan tingkat beban emosional yang signifikan.
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-sm text-red-600">
                                <li>Sangat disarankan untuk berkonsultasi dengan psikolog atau psikiater.</li>
                                <li>Jangan ragu untuk bercerita kepada orang terdekat yang Anda percaya.</li>
                                <li>Jika merasa tidak aman, segera hubungi layanan darurat kesehatan mental.</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex justify-center pt-4">
                <button onClick={onReset} className="btn btn-outline">
                    Ulangi Penilaian
                </button>
            </div>
        </div>
    );
}

function ResultRow({ label, level, score, isRisk }) {
    const getColor = (l) => {
        if (l === 'Sangat Berat' || l === 'Tinggi') return 'text-red-500 bg-red-500/10';
        if (l === 'Sedang/Berat' || l === 'Sedang') return 'text-orange-500 bg-orange-500/10';
        return 'text-green-500 bg-green-500/10';
    };

    return (
        <div className="flex items-center justify-between">
            <div>
                <div className="font-medium">{label}</div>
                <div className="text-xs text-[var(--muted-foreground)]">Skor: {score}</div>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getColor(level)}`}>
                {level}
            </div>
        </div>
    );
}
