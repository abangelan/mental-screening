"use client";

import { useState } from 'react';
import Link from 'next/link';
import NavigationControls from '@/components/ui/NavigationControls';

const DASS_QUESTIONS = [
    { text: "Saya merasa sulit untuk tenang", scales: ['stress'] },
    { text: "Saya merasa mulut saya kering", scales: ['anxiety'] },
    { text: "Saya tidak bisa merasakan perasaan positif sama sekali", scales: ['depression'] },
    { text: "Saya mengalami kesulitan bernapas (misalnya, napas cepat, kehabisan napas)", scales: ['anxiety'] },
    { text: "Saya merasa sulit untuk memulai melakukan sesuatu", scales: ['depression'] },
    { text: "Saya cenderung bereaksi berlebihan terhadap situasi", scales: ['stress'] },
    { text: "Saya mengalami gemetar (misalnya, di tangan)", scales: ['anxiety'] },
    { text: "Saya merasa menggunakan banyak energi gugup", scales: ['stress'] },
    { text: "Saya khawatir tentang situasi di mana saya mungkin panik dan membuat diri saya terlihat bodoh", scales: ['anxiety'] },
    { text: "Saya merasa tidak ada yang bisa dinanti-nantikan", scales: ['depression'] },
    { text: "Saya merasa gelisah", scales: ['stress'] },
    { text: "Saya merasa sulit untuk bersantai", scales: ['stress'] },
    { text: "Saya merasa sedih dan tertekan", scales: ['depression'] },
    { text: "Saya tidak toleran terhadap apa pun yang menghalangi saya untuk menyelesaikan apa yang sedang saya lakukan", scales: ['stress'] },
    { text: "Saya merasa hampir panik", scales: ['anxiety'] },
    { text: "Saya tidak bisa antusias tentang apa pun", scales: ['depression'] },
    { text: "Saya merasa tidak berharga sebagai pribadi", scales: ['depression'] },
    { text: "Saya merasa agak sensitif", scales: ['stress'] },
    { text: "Saya menyadari aksi jantung saya tanpa melakukan aktivitas fisik (misalnya, detak jantung meningkat atau melewatkan detak)", scales: ['anxiety'] },
    { text: "Saya merasa takut tanpa alasan yang jelas", scales: ['anxiety'] },
    { text: "Saya merasa hidup tidak berarti", scales: ['depression'] }
];

export default function DASS21Page() {
    const [answers, setAnswers] = useState({});
    const [result, setResult] = useState(null);

    const handleAnswer = (qIndex, value) => {
        setAnswers(prev => ({ ...prev, [qIndex]: value }));
    };

    const calculateScore = () => {
        let depression = 0, anxiety = 0, stress = 0;

        DASS_QUESTIONS.forEach((q, i) => {
            const value = answers[i] || 0;
            if (q.scales.includes('depression')) depression += value;
            if (q.scales.includes('anxiety')) anxiety += value;
            if (q.scales.includes('stress')) stress += value;
        });

        // DASS-21 scores are multiplied by 2
        depression *= 2;
        anxiety *= 2;
        stress *= 2;

        const getSeverity = (score, type) => {
            if (type === 'depression') {
                if (score >= 28) return { level: 'Sangat Berat', color: 'red' };
                if (score >= 21) return { level: 'Berat', color: 'orange' };
                if (score >= 14) return { level: 'Sedang', color: 'yellow' };
                if (score >= 10) return { level: 'Ringan', color: 'blue' };
                return { level: 'Normal', color: 'green' };
            } else if (type === 'anxiety') {
                if (score >= 20) return { level: 'Sangat Berat', color: 'red' };
                if (score >= 15) return { level: 'Berat', color: 'orange' };
                if (score >= 10) return { level: 'Sedang', color: 'yellow' };
                if (score >= 8) return { level: 'Ringan', color: 'blue' };
                return { level: 'Normal', color: 'green' };
            } else {
                if (score >= 34) return { level: 'Sangat Berat', color: 'red' };
                if (score >= 26) return { level: 'Berat', color: 'orange' };
                if (score >= 19) return { level: 'Sedang', color: 'yellow' };
                if (score >= 15) return { level: 'Ringan', color: 'blue' };
                return { level: 'Normal', color: 'green' };
            }
        };

        setResult({
            depression: { score: depression, ...getSeverity(depression, 'depression') },
            anxiety: { score: anxiety, ...getSeverity(anxiety, 'anxiety') },
            stress: { score: stress, ...getSeverity(stress, 'stress') }
        });
    };

    const getRecommendations = (result) => {
        const recommendations = [];

        if (result.depression.level !== 'Normal') {
            recommendations.push({
                title: "Depresi",
                items: [
                    "Konsultasikan dengan profesional kesehatan mental (psikolog atau psikiater)",
                    "Pertimbangkan terapi kognitif-perilaku (CBT) yang terbukti efektif untuk depresi",
                    "Jaga rutinitas harian: tidur teratur, makan sehat, dan olahraga ringan",
                    "Hindari isolasi sosial - tetap terhubung dengan keluarga dan teman",
                    "Praktikkan aktivitas yang dulu Anda nikmati, meskipun motivasi rendah",
                    "Pertimbangkan journaling untuk mengekspresikan perasaan"
                ]
            });
        }

        if (result.anxiety.level !== 'Normal') {
            recommendations.push({
                title: "Kecemasan",
                items: [
                    "Pelajari teknik pernapasan dalam dan relaksasi otot progresif",
                    "Praktikkan mindfulness atau meditasi 10-15 menit setiap hari",
                    "Batasi konsumsi kafein dan stimulan lainnya",
                    "Olahraga teratur dapat mengurangi gejala kecemasan secara signifikan",
                    "Identifikasi dan tantang pikiran yang memicu kecemasan",
                    "Pertimbangkan terapi exposure untuk fobia atau kecemasan spesifik"
                ]
            });
        }

        if (result.stress.level !== 'Normal') {
            recommendations.push({
                title: "Stres",
                items: [
                    "Identifikasi sumber stres utama dan buat rencana untuk mengatasinya",
                    "Praktikkan manajemen waktu yang efektif dan prioritaskan tugas",
                    "Belajar mengatakan 'tidak' untuk menghindari overcommitment",
                    "Luangkan waktu untuk hobi dan aktivitas yang menyenangkan",
                    "Pastikan tidur yang cukup (7-9 jam per malam)",
                    "Pertimbangkan teknik relaksasi seperti yoga atau tai chi"
                ]
            });
        }

        if (recommendations.length === 0) {
            recommendations.push({
                title: "Kesehatan Mental Baik",
                items: [
                    "Pertahankan gaya hidup sehat Anda saat ini",
                    "Terus praktikkan self-care dan manajemen stres",
                    "Lakukan skrining berkala untuk deteksi dini",
                    "Tetap terhubung dengan support system Anda",
                    "Jaga keseimbangan work-life balance"
                ]
            });
        }

        return recommendations;
    };

    const isComplete = DASS_QUESTIONS.every((_, i) => answers[i] !== undefined);

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <header>
                <h1 className="text-3xl font-bold mb-2">DASS-21 (Depression, Anxiety, Stress Scale)</h1>
                <p className="text-[var(--muted-foreground)]">
                    Kuesioner standar untuk mengukur tingkat depresi, kecemasan, dan stres.
                    Jawab berdasarkan pengalaman Anda selama 7 hari terakhir.
                </p>
            </header>

            {!result ? (
                <div className="space-y-6">
                    {DASS_QUESTIONS.map((q, i) => (
                        <div key={i} className="card p-6">
                            <p className="font-medium mb-4">{i + 1}. {q.text}</p>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                {[
                                    { val: 0, label: "Tidak pernah" },
                                    { val: 1, label: "Kadang-kadang" },
                                    { val: 2, label: "Sering" },
                                    { val: 3, label: "Hampir selalu" }
                                ].map((opt) => (
                                    <button
                                        key={opt.val}
                                        onClick={() => handleAnswer(i, opt.val)}
                                        className={`p-2 text-sm rounded-md border transition-colors ${answers[i] === opt.val
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
                            Lihat Hasil
                        </button>
                    </div>
                </div>
            ) : (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {['depression', 'anxiety', 'stress'].map((type) => (
                            <div key={type} className="card text-center py-6">
                                <h3 className="text-sm font-medium text-[var(--muted-foreground)] mb-2 capitalize">
                                    {type === 'depression' ? 'Depresi' : type === 'anxiety' ? 'Kecemasan' : 'Stres'}
                                </h3>
                                <div className={`text-4xl font-bold mb-2 ${result[type].color === 'red' ? 'text-red-600' :
                                        result[type].color === 'orange' ? 'text-orange-600' :
                                            result[type].color === 'yellow' ? 'text-yellow-600' :
                                                result[type].color === 'blue' ? 'text-blue-600' :
                                                    'text-green-600'
                                    }`}>
                                    {result[type].score}
                                </div>
                                <div className="text-sm font-medium">{result[type].level}</div>
                            </div>
                        ))}
                    </div>

                    <div className="card">
                        <h3 className="text-xl font-semibold mb-4">Rekomendasi & Saran</h3>
                        <div className="space-y-6">
                            {getRecommendations(result).map((rec, i) => (
                                <div key={i}>
                                    <h4 className="font-semibold text-[var(--primary)] mb-2">{rec.title}</h4>
                                    <ul className="list-disc list-inside space-y-2 text-sm text-[var(--muted-foreground)]">
                                        {rec.items.map((item, j) => (
                                            <li key={j}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 p-4 bg-[var(--muted)] rounded-lg">
                            <p className="text-sm text-[var(--muted-foreground)]">
                                <strong>Catatan Penting:</strong> Hasil ini adalah alat skrining, bukan diagnosis medis.
                                Jika Anda mengalami gejala yang mengganggu kehidupan sehari-hari, sangat disarankan untuk
                                berkonsultasi dengan profesional kesehatan mental.
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-center gap-4">
                        <button onClick={() => { setResult(null); setAnswers({}); }} className="btn btn-outline">
                            Ulangi Tes
                        </button>
                    </div>
                </div>
            )}

            <NavigationControls />
        </div>
    );
}
