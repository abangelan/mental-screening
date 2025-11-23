"use client";

import { useState } from 'react';
import Link from 'next/link';

const TESTS = {
    'phq-9': {
        title: 'PHQ-9 (Depresi)',
        description: 'Kuesioner Kesehatan Pasien-9 untuk skrining depresi.',
        questions: [
            "Kurang berminat atau bergairah dalam melakukan apapun",
            "Merasa murung, sedih, atau putus asa",
            "Sulit tidur/mudah terbangun, atau terlalu banyak tidur",
            "Merasa lelah atau kurang bertenaga",
            "Kurang nafsu makan atau terlalu banyak makan",
            "Kurang percaya diri — atau merasa bahwa Anda adalah orang yang gagal atau telah mengecewakan diri sendiri atau keluarga",
            "Sulit berkonsentrasi pada sesuatu, misalnya membaca koran atau menonton televisi",
            "Bergerak atau berbicara sangat lambat sehingga orang lain memperhatikannya",
            "Merasa lebih baik mati atau ingin melukai diri sendiri dengan cara apapun"
        ]
    },
    'gad-7': {
        title: 'GAD-7 (Kecemasan)',
        description: 'Gangguan Kecemasan Umum-7 untuk skrining kecemasan.',
        questions: [
            "Merasa gugup, cemas, atau gelisah",
            "Tidak mampu menghentikan atau mengendalikan kekhawatiran",
            "Terlalu mengkhawatirkan berbagai hal",
            "Sulit untuk bersantai",
            "Sangat gelisah sehingga sulit untuk duduk diam",
            "Mudah menjadi kesal atau jengkel",
            "Merasa takut seolah-olah sesuatu yang buruk akan terjadi"
        ]
    }
};

import NavigationControls from '@/components/ui/NavigationControls';

export default function StandardTestsPage() {
    const [selectedTest, setSelectedTest] = useState(null);
    const [answers, setAnswers] = useState({});
    const [result, setResult] = useState(null);

    const handleStartTest = (testId) => {
        setSelectedTest(testId);
        setAnswers({});
        setResult(null);
    };

    const handleAnswer = (qIndex, value) => {
        setAnswers(prev => ({ ...prev, [qIndex]: value }));
    };

    const calculateScore = () => {
        const total = Object.values(answers).reduce((a, b) => a + b, 0);
        let severity = 'Minimal';
        let recommendations = [];

        if (selectedTest === 'phq-9') {
            if (total >= 20) {
                severity = 'Sangat Berat';
                recommendations = [
                    {
                        category: "Tindakan Segera Diperlukan",
                        items: [
                            "PENTING: Segera konsultasikan dengan psikolog atau psikiater profesional.",
                            "Jangan menunda - depresi berat memerlukan intervensi profesional.",
                            "Jika ada pikiran untuk menyakiti diri, segera hubungi hotline krisis (119) atau IGD terdekat.",
                            "Pertimbangkan terapi kombinasi (psikoterapi + medikasi) dengan bimbingan profesional.",
                            "Libatkan keluarga atau teman dekat sebagai support system.",
                            "Hindari keputusan besar atau perubahan hidup signifikan saat ini."
                        ]
                    },
                    {
                        category: "Manajemen Harian",
                        items: [
                            "Tetapkan rutinitas sederhana: bangun, mandi, makan pada waktu yang sama setiap hari.",
                            "Jangan isolasi diri - tetap terhubung dengan orang terpercaya meskipun sulit.",
                            "Lakukan aktivitas fisik ringan 10-15 menit sehari, bahkan hanya berjalan.",
                            "Jaga pola tidur teratur dan hindari tidur berlebihan.",
                            "Batasi alkohol dan hindari penggunaan zat."
                        ]
                    }
                ];
            } else if (total >= 15) {
                severity = 'Berat';
                recommendations = [
                    {
                        category: "Konsultasi Profesional",
                        items: [
                            "Sangat disarankan untuk berkonsultasi dengan psikolog atau psikiater.",
                            "Pertimbangkan terapi CBT (Cognitive Behavioral Therapy) yang terbukti efektif.",
                            "Diskusikan dengan profesional apakah medikasi diperlukan.",
                            "Ikuti terapi secara konsisten dan jangan putus di tengah jalan."
                        ]
                    },
                    {
                        category: "Strategi Coping",
                        items: [
                            "Lakukan aktivitas yang dulu Anda nikmati, meskipun tidak terasa menyenangkan sekarang.",
                            "Praktikkan self-compassion - perlakukan diri sendiri dengan baik.",
                            "Tuliskan pikiran negatif dan tantang dengan bukti yang lebih realistis.",
                            "Tetap terhubung dengan support system Anda.",
                            "Jaga nutrisi yang baik dan hindari melewatkan makan."
                        ]
                    }
                ];
            } else if (total >= 10) {
                severity = 'Sedang';
                recommendations = [
                    {
                        category: "Pertimbangkan Konsultasi",
                        items: [
                            "Pertimbangkan untuk berkonsultasi dengan profesional kesehatan mental.",
                            "Terapi psikologis dapat sangat membantu pada tahap ini.",
                            "Jangan tunggu hingga memburuk - intervensi dini lebih efektif."
                        ]
                    },
                    {
                        category: "Self-Help Strategies",
                        items: [
                            "Praktikkan aktivitas fisik teratur - 30 menit, 3-5 kali seminggu.",
                            "Jaga pola tidur yang konsisten (7-9 jam per malam).",
                            "Batasi paparan berita negatif dan media sosial.",
                            "Lakukan journaling untuk mengekspresikan perasaan.",
                            "Tetapkan tujuan kecil yang dapat dicapai setiap hari."
                        ]
                    }
                ];
            } else if (total >= 5) {
                severity = 'Ringan';
                recommendations = [
                    {
                        category: "Pencegahan & Peningkatan Mood",
                        items: [
                            "Jaga pola hidup sehat: olahraga, nutrisi, dan tidur yang cukup.",
                            "Praktikkan gratitude journaling - tuliskan 3 hal yang Anda syukuri setiap hari.",
                            "Tetap terhubung dengan teman dan keluarga.",
                            "Lakukan aktivitas yang menyenangkan secara teratur.",
                            "Monitor mood Anda dan waspadai perubahan."
                        ]
                    }
                ];
            } else {
                recommendations = [
                    {
                        category: "Pertahankan Kesehatan Mental",
                        items: [
                            "Terus praktikkan gaya hidup sehat.",
                            "Jaga keseimbangan work-life balance.",
                            "Lakukan skrining berkala untuk deteksi dini.",
                            "Tetap waspada terhadap perubahan mood."
                        ]
                    }
                ];
            }
        } else if (selectedTest === 'gad-7') {
            if (total >= 15) {
                severity = 'Berat';
                recommendations = [
                    {
                        category: "Intervensi Profesional",
                        items: [
                            "Segera konsultasikan dengan profesional kesehatan mental.",
                            "Terapi CBT sangat efektif untuk gangguan kecemasan.",
                            "Pertimbangkan terapi exposure untuk fobia atau kecemasan spesifik.",
                            "Diskusikan dengan profesional apakah medikasi anti-kecemasan diperlukan."
                        ]
                    },
                    {
                        category: "Teknik Manajemen Kecemasan",
                        items: [
                            "Praktikkan grounding 5-4-3-2-1 saat cemas: 5 hal yang dilihat, 4 yang didengar, 3 yang disentuh, 2 yang dicium, 1 yang dirasa.",
                            "Lakukan pernapasan diafragma atau box breathing secara teratur.",
                            "Batasi kafein, alkohol, dan stimulan lainnya.",
                            "Tuliskan kekhawatiran dan evaluasi apakah realistis.",
                            "Praktikkan progressive muscle relaxation."
                        ]
                    }
                ];
            } else if (total >= 10) {
                severity = 'Sedang';
                recommendations = [
                    {
                        category: "Manajemen Kecemasan",
                        items: [
                            "Pertimbangkan konsultasi dengan psikolog untuk terapi.",
                            "Pelajari dan praktikkan teknik relaksasi secara konsisten.",
                            "Identifikasi dan hindari trigger kecemasan jika memungkinkan.",
                            "Olahraga teratur dapat mengurangi kecemasan secara signifikan."
                        ]
                    },
                    {
                        category: "Strategi Harian",
                        items: [
                            "Batasi overthinking dengan menetapkan 'worry time' 15 menit per hari.",
                            "Praktikkan mindfulness atau meditasi 10-15 menit sehari.",
                            "Hindari menghindari situasi yang memicu kecemasan - hadapi secara bertahap.",
                            "Jaga pola tidur yang baik - kurang tidur memperburuk kecemasan."
                        ]
                    }
                ];
            } else if (total >= 5) {
                severity = 'Ringan';
                recommendations = [
                    {
                        category: "Pencegahan Kecemasan",
                        items: [
                            "Praktikkan teknik pernapasan dalam saat merasa cemas.",
                            "Batasi paparan berita negatif dan media sosial.",
                            "Lakukan aktivitas yang menenangkan seperti yoga atau tai chi.",
                            "Berbicara dengan orang terpercaya tentang kekhawatiran Anda.",
                            "Jaga gaya hidup sehat dengan olahraga dan nutrisi yang baik."
                        ]
                    }
                ];
            } else {
                recommendations = [
                    {
                        category: "Pertahankan Kesehatan Mental",
                        items: [
                            "Terus praktikkan teknik relaksasi.",
                            "Jaga keseimbangan hidup yang sehat.",
                            "Monitor tingkat kecemasan Anda secara berkala.",
                            "Tetap waspada terhadap perubahan pola kecemasan."
                        ]
                    }
                ];
            }
        }

        setResult({ score: total, severity, recommendations });
    };

    if (selectedTest) {
        const test = TESTS[selectedTest];
        const isComplete = test.questions.every((_, i) => answers[i] !== undefined);

        return (
            <div className="max-w-3xl mx-auto space-y-8">
                <header>
                    <button onClick={() => setSelectedTest(null)} className="text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] mb-4">
                        ← Kembali ke Daftar Tes
                    </button>
                    <h1 className="text-3xl font-bold mb-2">{test.title}</h1>
                    <p className="text-[var(--muted-foreground)]">
                        Selama 2 minggu terakhir, seberapa sering Anda terganggu oleh masalah-masalah berikut?
                    </p>
                </header>

                {!result ? (
                    <div className="space-y-6">
                        {test.questions.map((q, i) => (
                            <div key={i} className="card p-6">
                                <p className="font-medium mb-4">{i + 1}. {q}</p>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                    {[
                                        { val: 0, label: "Tidak sama sekali" },
                                        { val: 1, label: "Beberapa hari" },
                                        { val: 2, label: "Lebih dari separuh waktu" },
                                        { val: 3, label: "Hampir setiap hari" }
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
                                Kirim Penilaian
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
                        <div className="card text-center py-10 bg-[var(--card)] border-[var(--border)]">
                            <div className="text-center py-8">
                                <div className="text-6xl font-bold text-[var(--primary)] mb-2">{result.score}</div>
                                <div className="text-lg font-medium text-[var(--muted-foreground)]">Skor Total</div>
                                <div className={`mt-4 inline-block px-4 py-2 rounded-full font-semibold ${result.severity === 'Sangat Berat' || result.severity === 'Berat' ? 'bg-red-100 text-red-700' :
                                        result.severity === 'Sedang' ? 'bg-orange-100 text-orange-700' :
                                            result.severity === 'Ringan' ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-green-100 text-green-700'
                                    }`}>
                                    {result.severity}
                                </div>
                            </div>

                            <div className="card">
                                <h3 className="text-xl font-semibold mb-4">Rekomendasi & Rencana Tindakan</h3>
                                <div className="space-y-6">
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
                                        <strong>Catatan Penting:</strong> Hasil ini adalah alat skrining standar yang digunakan secara klinis,
                                        namun bukan diagnosis medis. Untuk diagnosis dan penanganan yang tepat, konsultasikan dengan
                                        profesional kesehatan mental (psikolog atau psikiater).
                                    </p>
                                </div>
                            </div>
                            <p className="mt-6 text-sm text-[var(--muted-foreground)] max-w-md mx-auto">
                                Hasil ini bukan diagnosis medis. Silakan konsultasikan dengan profesional kesehatan untuk penilaian klinis yang tepat.
                            </p>
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

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <header>
                <h1 className="text-3xl font-bold mb-2">Penilaian Standar</h1>
                <p className="text-[var(--muted-foreground)]">
                    Kuesioner yang valid secara klinis untuk membantu menilai status kesehatan mental Anda.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(TESTS).map(([id, test]) => (
                    <div key={id} className="card hover:border-[var(--primary)] transition-colors cursor-pointer flex flex-col justify-between">
                        <div>
                            <h3 className="text-xl font-semibold mb-2">{test.title}</h3>
                            <p className="text-sm text-[var(--muted-foreground)] mb-4">{test.description}</p>
                        </div>
                        <button
                            onClick={() => handleStartTest(id)}
                            className="btn btn-outline w-full mt-4"
                        >
                            Mulai Penilaian
                        </button>
                    </div>
                ))}

                <Link href="/screening/test/dass21" className="card hover:border-[var(--primary)] transition-colors flex flex-col justify-between">
                    <div>
                        <h3 className="text-xl font-semibold mb-2">DASS-21</h3>
                        <p className="text-sm text-[var(--muted-foreground)] mb-4">
                            Skala Depresi, Kecemasan, dan Stres - 21 item untuk penilaian komprehensif.
                        </p>
                    </div>
                    <div className="btn btn-outline w-full mt-4">
                        Mulai Penilaian
                    </div>
                </Link>

                <Link href="/screening/test/burnout-inventory" className="card hover:border-[var(--primary)] transition-colors flex flex-col justify-between">
                    <div>
                        <h3 className="text-xl font-semibold mb-2">Inventaris Burnout</h3>
                        <p className="text-sm text-[var(--muted-foreground)] mb-4">
                            Maslach Burnout Inventory untuk mengukur burnout profesional.
                        </p>
                    </div>
                    <div className="btn btn-outline w-full mt-4">
                        Mulai Penilaian
                    </div>
                </Link>
            </div>

            <NavigationControls />
        </div>
    );
}
