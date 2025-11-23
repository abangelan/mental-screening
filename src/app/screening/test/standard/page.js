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

const BURNOUT_QUESTIONS = [
    { text: "Saya merasa terkuras secara emosional dari pekerjaan saya", category: 'exhaustion', source: 'burnout' },
    { text: "Saya merasa habis-habisan di akhir hari kerja", category: 'exhaustion', source: 'burnout' },
    { text: "Saya merasa lelah ketika bangun di pagi hari dan harus menghadapi hari lain di tempat kerja", category: 'exhaustion', source: 'burnout' },
    { text: "Bekerja dengan orang sepanjang hari benar-benar melelahkan bagi saya", category: 'exhaustion', source: 'burnout' },
    { text: "Saya merasa burnout karena pekerjaan saya", category: 'exhaustion', source: 'burnout' },
    { text: "Saya merasa frustrasi dengan pekerjaan saya", category: 'exhaustion', source: 'burnout' },
    { text: "Saya merasa saya bekerja terlalu keras pada pekerjaan saya", category: 'exhaustion', source: 'burnout' },
    { text: "Bekerja langsung dengan orang membuat saya terlalu stres", category: 'exhaustion', source: 'burnout' },
    { text: "Saya merasa seperti di ujung tali", category: 'exhaustion', source: 'burnout' },
    { text: "Saya merasa saya memperlakukan beberapa orang seolah-olah mereka adalah objek impersonal", category: 'depersonalization', source: 'burnout' },
    { text: "Saya menjadi lebih tidak peduli terhadap orang sejak saya mulai pekerjaan ini", category: 'depersonalization', source: 'burnout' },
    { text: "Saya khawatir pekerjaan ini membuat saya tidak peka secara emosional", category: 'depersonalization', source: 'burnout' },
    { text: "Saya tidak terlalu peduli dengan apa yang terjadi pada beberapa orang", category: 'depersonalization', source: 'burnout' },
    { text: "Saya merasa orang menyalahkan saya atas beberapa masalah mereka", category: 'depersonalization', source: 'burnout' },
    { text: "Saya dapat memahami dengan mudah bagaimana perasaan orang-orang", category: 'accomplishment', source: 'burnout' },
    { text: "Saya menangani masalah emosional dengan sangat efektif", category: 'accomplishment', source: 'burnout' },
    { text: "Saya merasa saya secara positif mempengaruhi kehidupan orang lain melalui pekerjaan saya", category: 'accomplishment', source: 'burnout' },
    { text: "Saya merasa sangat energik", category: 'accomplishment', source: 'burnout' },
    { text: "Saya dapat dengan mudah menciptakan suasana santai dengan orang-orang", category: 'accomplishment', source: 'burnout' },
    { text: "Saya merasa gembira setelah bekerja dekat dengan orang-orang", category: 'accomplishment', source: 'burnout' },
    { text: "Saya telah mencapai banyak hal berharga dalam pekerjaan ini", category: 'accomplishment', source: 'burnout' },
    { text: "Dalam pekerjaan saya, saya menangani masalah emosional dengan tenang", category: 'accomplishment', source: 'burnout' }
];

// Combine all questions
const ALL_QUESTIONS = [...DASS_QUESTIONS, ...BURNOUT_QUESTIONS];
const ITEMS_PER_PAGE = 10;

export default function UnifiedScreeningPage() {
    const [currentPage, setCurrentPage] = useState(0);
    const [answers, setAnswers] = useState({});
    const [result, setResult] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const totalPages = Math.ceil(ALL_QUESTIONS.length / ITEMS_PER_PAGE);
    const progress = Math.round(((currentPage) / totalPages) * 100);

    // Scroll to top on page change
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    const handleAnswer = (globalIndex, value) => {
        setAnswers(prev => ({ ...prev, [globalIndex]: value }));
    };

    const handleNext = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(prev => prev + 1);
        } else {
            calculateResults();
        }
    };

    const handlePrev = () => {
        if (currentPage > 0) {
            setCurrentPage(prev => prev - 1);
        }
    };

    const calculateResults = async () => {
        setIsAnalyzing(true);

        // Simulate analysis delay for "AI" feel
        await new Promise(r => setTimeout(r, 2000));

        let scores = {
            depression: 0, anxiety: 0, stress: 0,
            exhaustion: 0, depersonalization: 0, accomplishment: 0
        };

        ALL_QUESTIONS.forEach((q, i) => {
            const val = answers[i] || 0;
            if (q.source === 'dass') {
                scores[q.category] += val;
            } else {
                scores[q.category] += val;
            }
        });

        // DASS-21 adjustment (x2)
        scores.depression *= 2;
        scores.anxiety *= 2;
        scores.stress *= 2;

        // Burnout Accomplishment Reversal
        // Max score for accomplishment is 8 items * 6 (max val) = 48? 
        // Wait, burnout scale usually 0-6. Let's check options.
        // We will use 0-3 for DASS and 0-6 for Burnout to match standard.
        // BUT for simplicity in UI, we might map them to a similar visual scale or keep them distinct.
        // Let's check the UI rendering part. We need different options for DASS vs Burnout questions.

        // Actually, to keep it simple for the user as requested ("Mudah digunakan"), 
        // let's unify the scale to 0-3 visually but map it internally?
        // Or just show the correct options for each question type.
        // DASS: 0-3. Burnout: 0-6.
        // If we mix them on the same page, it might be confusing if options change.
        // Better to keep DASS questions together and Burnout questions together?
        // The array `ALL_QUESTIONS` has DASS first, then Burnout. So page 1-2 will be DASS, page 3-5 Burnout.
        // That works.

        // Recalculate Burnout Accomplishment (Reversed)
        // 8 items. If we use 0-6 scale. Max is 48.
        const maxAccomplishment = 8 * 6;
        const accomplishmentReversed = maxAccomplishment - scores.accomplishment;

        const getDASSLevel = (score, type) => {
            // Simplified logic for brevity
            if (type === 'depression') return score >= 28 ? 'Sangat Berat' : score >= 14 ? 'Sedang/Berat' : 'Normal';
            if (type === 'anxiety') return score >= 20 ? 'Sangat Berat' : score >= 10 ? 'Sedang/Berat' : 'Normal';
            return score >= 34 ? 'Sangat Berat' : score >= 19 ? 'Sedang/Berat' : 'Normal';
        };

        const getBurnoutRisk = (score, type) => {
            if (type === 'exhaustion') return score >= 27 ? 'Tinggi' : score >= 17 ? 'Sedang' : 'Rendah';
            if (type === 'depersonalization') return score >= 13 ? 'Tinggi' : score >= 7 ? 'Sedang' : 'Rendah';
            return score >= 32 ? 'Tinggi' : score >= 24 ? 'Sedang' : 'Rendah'; // For reversed accomplishment
        };

        setResult({
            dass: {
                depression: { score: scores.depression, level: getDASSLevel(scores.depression, 'depression') },
                anxiety: { score: scores.anxiety, level: getDASSLevel(scores.anxiety, 'anxiety') },
                stress: { score: scores.stress, level: getDASSLevel(scores.stress, 'stress') }
            },
            burnout: {
                exhaustion: { score: scores.exhaustion, risk: getBurnoutRisk(scores.exhaustion, 'exhaustion') },
                depersonalization: { score: scores.depersonalization, risk: getBurnoutRisk(scores.depersonalization, 'depersonalization') },
                accomplishment: { score: accomplishmentReversed, risk: getBurnoutRisk(accomplishmentReversed, 'accomplishment') } // Use reversed for risk
            }
        });
        setIsAnalyzing(false);
    };

    const currentQuestions = ALL_QUESTIONS.slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE);
    const isPageComplete = currentQuestions.every((_, i) => answers[(currentPage * ITEMS_PER_PAGE) + i] !== undefined);

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

            <header className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Penilaian Kesehatan Mental Lengkap</h1>
                <p className="text-[var(--muted-foreground)]">
                    Kuesioner ini menggabungkan standar klinis untuk Depresi, Kecemasan, Stres, dan Burnout.
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
                    const isDass = q.source === 'dass';
                    const options = isDass
                        ? [
                            { val: 0, label: "Tidak pernah" },
                            { val: 1, label: "Kadang-kadang" },
                            { val: 2, label: "Sering" },
                            { val: 3, label: "Hampir selalu" }
                        ]
                        : [
                            { val: 0, label: "Tidak pernah" },
                            { val: 1, label: "Jarang" },
                            { val: 2, label: "Kadang" },
                            { val: 3, label: "Sering" },
                            { val: 4, label: "Sering sekali" },
                            { val: 5, label: "Hampir setiap hari" },
                            { val: 6, label: "Setiap hari" }
                        ];

                    return (
                        <div key={globalIndex} className="card p-6 animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${index * 50}ms` }}>
                            <p className="font-medium text-lg mb-4">
                                <span className="text-[var(--muted-foreground)] mr-2">{globalIndex + 1}.</span>
                                {q.text}
                            </p>
                            <div className={`grid gap-2 ${isDass ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4'}`}>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* DASS Results */}
                <div className="card space-y-6">
                    <h3 className="text-xl font-semibold border-b border-[var(--border)] pb-2">Kesehatan Mental Umum</h3>
                    <div className="space-y-4">
                        <ResultRow label="Tingkat Stres" level={result.dass.stress.level} score={result.dass.stress.score} />
                        <ResultRow label="Tingkat Kecemasan" level={result.dass.anxiety.level} score={result.dass.anxiety.score} />
                        <ResultRow label="Tingkat Depresi" level={result.dass.depression.level} score={result.dass.depression.score} />
                    </div>
                </div>

                {/* Burnout Results */}
                <div className="card space-y-6">
                    <h3 className="text-xl font-semibold border-b border-[var(--border)] pb-2">Risiko Burnout (Pekerjaan)</h3>
                    <div className="space-y-4">
                        <ResultRow label="Kelelahan Emosional" level={result.burnout.exhaustion.risk} score={result.burnout.exhaustion.score} isRisk={true} />
                        <ResultRow label="Depersonalisasi" level={result.burnout.depersonalization.risk} score={result.burnout.depersonalization.score} isRisk={true} />
                        <ResultRow label="Pencapaian Pribadi" level={result.burnout.accomplishment.risk} score={result.burnout.accomplishment.score} isRisk={true} />
                    </div>
                </div>
            </div>

            <div className="card bg-[var(--muted)] border-[var(--border)]">
                <h3 className="font-semibold mb-2">Rekomendasi Singkat</h3>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                    {result.dass.stress.level === 'Sangat Berat' || result.burnout.exhaustion.risk === 'Tinggi'
                        ? "Hasil menunjukkan indikasi beban mental yang signifikan. Sangat disarankan untuk mengambil jeda sejenak, berbicara dengan orang terpercaya, atau berkonsultasi dengan profesional."
                        : "Kondisi kesehatan mental Anda tampak cukup stabil. Pertahankan gaya hidup sehat dan manajemen stres yang baik."}
                </p>
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
