"use client";

import { useState } from 'react';
import Link from 'next/link';
import NavigationControls from '@/components/ui/NavigationControls';

const BURNOUT_QUESTIONS = [
    // Emotional Exhaustion
    { text: "Saya merasa terkuras secara emosional dari pekerjaan saya", dimension: 'exhaustion' },
    { text: "Saya merasa habis-habisan di akhir hari kerja", dimension: 'exhaustion' },
    { text: "Saya merasa lelah ketika bangun di pagi hari dan harus menghadapi hari lain di tempat kerja", dimension: 'exhaustion' },
    { text: "Bekerja dengan orang sepanjang hari benar-benar melelahkan bagi saya", dimension: 'exhaustion' },
    { text: "Saya merasa burnout karena pekerjaan saya", dimension: 'exhaustion' },
    { text: "Saya merasa frustrasi dengan pekerjaan saya", dimension: 'exhaustion' },
    { text: "Saya merasa saya bekerja terlalu keras pada pekerjaan saya", dimension: 'exhaustion' },
    { text: "Bekerja langsung dengan orang membuat saya terlalu stres", dimension: 'exhaustion' },
    { text: "Saya merasa seperti di ujung tali", dimension: 'exhaustion' },

    // Depersonalization
    { text: "Saya merasa saya memperlakukan beberapa orang seolah-olah mereka adalah objek impersonal", dimension: 'depersonalization' },
    { text: "Saya menjadi lebih tidak peduli terhadap orang sejak saya mulai pekerjaan ini", dimension: 'depersonalization' },
    { text: "Saya khawatir pekerjaan ini membuat saya tidak peka secara emosional", dimension: 'depersonalization' },
    { text: "Saya tidak terlalu peduli dengan apa yang terjadi pada beberapa orang", dimension: 'depersonalization' },
    { text: "Saya merasa orang menyalahkan saya atas beberapa masalah mereka", dimension: 'depersonalization' },

    // Personal Accomplishment (reversed)
    { text: "Saya dapat memahami dengan mudah bagaimana perasaan orang-orang", dimension: 'accomplishment' },
    { text: "Saya menangani masalah emosional dengan sangat efektif", dimension: 'accomplishment' },
    { text: "Saya merasa saya secara positif mempengaruhi kehidupan orang lain melalui pekerjaan saya", dimension: 'accomplishment' },
    { text: "Saya merasa sangat energik", dimension: 'accomplishment' },
    { text: "Saya dapat dengan mudah menciptakan suasana santai dengan orang-orang", dimension: 'accomplishment' },
    { text: "Saya merasa gembira setelah bekerja dekat dengan orang-orang", dimension: 'accomplishment' },
    { text: "Saya telah mencapai banyak hal berharga dalam pekerjaan ini", dimension: 'accomplishment' },
    { text: "Dalam pekerjaan saya, saya menangani masalah emosional dengan tenang", dimension: 'accomplishment' }
];

export default function BurnoutInventoryPage() {
    const [answers, setAnswers] = useState({});
    const [result, setResult] = useState(null);

    const handleAnswer = (qIndex, value) => {
        setAnswers(prev => ({ ...prev, [qIndex]: value }));
    };

    const calculateScore = () => {
        let exhaustion = 0, depersonalization = 0, accomplishment = 0;

        BURNOUT_QUESTIONS.forEach((q, i) => {
            const value = answers[i] || 0;
            if (q.dimension === 'exhaustion') exhaustion += value;
            if (q.dimension === 'depersonalization') depersonalization += value;
            if (q.dimension === 'accomplishment') accomplishment += value;
        });

        // Personal accomplishment is reversed (lower is worse)
        const maxAccomplishment = 8 * 6; // 8 questions * max score 6
        const accomplishmentReversed = maxAccomplishment - accomplishment;

        const getSeverity = (score, type) => {
            if (type === 'exhaustion') {
                if (score >= 27) return { level: 'Tinggi', color: 'red', risk: 'Tinggi' };
                if (score >= 17) return { level: 'Sedang', color: 'orange', risk: 'Sedang' };
                return { level: 'Rendah', color: 'green', risk: 'Rendah' };
            } else if (type === 'depersonalization') {
                if (score >= 13) return { level: 'Tinggi', color: 'red', risk: 'Tinggi' };
                if (score >= 7) return { level: 'Sedang', color: 'orange', risk: 'Sedang' };
                return { level: 'Rendah', color: 'green', risk: 'Rendah' };
            } else {
                if (accomplishmentReversed >= 32) return { level: 'Tinggi', color: 'red', risk: 'Tinggi' };
                if (accomplishmentReversed >= 24) return { level: 'Sedang', color: 'orange', risk: 'Sedang' };
                return { level: 'Rendah', color: 'green', risk: 'Rendah' };
            }
        };

        const overallRisk = () => {
            const scores = [
                getSeverity(exhaustion, 'exhaustion').risk,
                getSeverity(depersonalization, 'depersonalization').risk,
                getSeverity(accomplishmentReversed, 'accomplishment').risk
            ];
            if (scores.filter(s => s === 'Tinggi').length >= 2) return 'Tinggi';
            if (scores.includes('Tinggi') || scores.filter(s => s === 'Sedang').length >= 2) return 'Sedang';
            return 'Rendah';
        };

        setResult({
            exhaustion: { score: exhaustion, ...getSeverity(exhaustion, 'exhaustion') },
            depersonalization: { score: depersonalization, ...getSeverity(depersonalization, 'depersonalization') },
            accomplishment: { score: accomplishment, reversedScore: accomplishmentReversed, ...getSeverity(accomplishmentReversed, 'accomplishment') },
            overall: overallRisk()
        });
    };

    const getRecommendations = (result) => {
        const recommendations = [];

        if (result.exhaustion.risk === 'Tinggi') {
            recommendations.push({
                title: "Kelelahan Emosional Tinggi",
                severity: "Perlu Perhatian Segera",
                items: [
                    "Segera konsultasikan dengan profesional kesehatan mental atau konselor",
                    "Pertimbangkan untuk mengambil cuti atau istirahat dari pekerjaan",
                    "Evaluasi beban kerja dengan atasan dan diskusikan redistribusi tugas",
                    "Praktikkan self-care harian: tidur 7-9 jam, makan teratur, olahraga ringan",
                    "Tetapkan batasan yang jelas antara waktu kerja dan waktu pribadi",
                    "Hindari lembur berlebihan dan pastikan waktu istirahat yang cukup"
                ]
            });
        } else if (result.exhaustion.risk === 'Sedang') {
            recommendations.push({
                title: "Kelelahan Emosional Sedang",
                severity: "Perlu Tindakan Preventif",
                items: [
                    "Mulai praktikkan teknik manajemen stres seperti meditasi atau yoga",
                    "Identifikasi sumber stres utama di tempat kerja",
                    "Buat jadwal istirahat teratur selama hari kerja",
                    "Pertimbangkan untuk berbicara dengan supervisor tentang beban kerja",
                    "Luangkan waktu untuk hobi dan aktivitas yang menyenangkan"
                ]
            });
        }

        if (result.depersonalization.risk === 'Tinggi') {
            recommendations.push({
                title: "Depersonalisasi Tinggi",
                severity: "Perlu Intervensi",
                items: [
                    "Cari dukungan profesional untuk mengatasi perasaan sinis dan detachment",
                    "Refleksikan nilai-nilai dan motivasi awal Anda dalam pekerjaan",
                    "Praktikkan empati dan mindfulness dalam interaksi dengan orang lain",
                    "Pertimbangkan peer support group atau supervisi klinis",
                    "Evaluasi apakah pekerjaan saat ini masih sesuai dengan nilai pribadi Anda",
                    "Fokus pada aspek positif dan dampak pekerjaan Anda terhadap orang lain"
                ]
            });
        } else if (result.depersonalization.risk === 'Sedang') {
            recommendations.push({
                title: "Depersonalisasi Sedang",
                severity: "Waspada",
                items: [
                    "Praktikkan mindfulness untuk tetap hadir dalam interaksi",
                    "Ingat kembali tujuan dan makna pekerjaan Anda",
                    "Cari dukungan dari rekan kerja atau mentor",
                    "Luangkan waktu untuk refleksi diri secara teratur"
                ]
            });
        }

        if (result.accomplishment.risk === 'Tinggi') {
            recommendations.push({
                title: "Pencapaian Pribadi Rendah",
                severity: "Perlu Dukungan",
                items: [
                    "Catat dan rayakan pencapaian kecil setiap hari",
                    "Cari feedback positif dari supervisor atau rekan kerja",
                    "Pertimbangkan pelatihan atau pengembangan keterampilan baru",
                    "Tetapkan tujuan yang realistis dan dapat dicapai",
                    "Bergabung dengan komunitas profesional untuk dukungan dan inspirasi",
                    "Pertimbangkan mentoring atau coaching untuk pengembangan karir"
                ]
            });
        } else if (result.accomplishment.risk === 'Sedang') {
            recommendations.push({
                title: "Pencapaian Pribadi Perlu Ditingkatkan",
                severity: "Fokus Pengembangan",
                items: [
                    "Tetapkan tujuan profesional yang jelas dan terukur",
                    "Cari kesempatan untuk mengembangkan keterampilan baru",
                    "Minta feedback konstruktif dari atasan",
                    "Rayakan kesuksesan dan pembelajaran dari kegagalan"
                ]
            });
        }

        if (result.overall === 'Rendah') {
            recommendations.push({
                title: "Kesehatan Mental Kerja Baik",
                severity: "Pertahankan",
                items: [
                    "Terus praktikkan work-life balance yang sehat",
                    "Lakukan self-assessment berkala untuk deteksi dini",
                    "Pertahankan support system yang kuat",
                    "Tetap terlibat dalam aktivitas yang bermakna di luar pekerjaan",
                    "Jaga kesehatan fisik dengan olahraga dan nutrisi yang baik"
                ]
            });
        }

        // General recommendations for all
        recommendations.push({
            title: "Strategi Umum Pencegahan Burnout",
            severity: "Untuk Semua",
            items: [
                "Bangun dan pertahankan support network yang kuat (keluarga, teman, rekan kerja)",
                "Praktikkan teknik relaksasi seperti deep breathing atau progressive muscle relaxation",
                "Tetapkan batasan yang sehat antara pekerjaan dan kehidupan pribadi",
                "Prioritaskan self-care: tidur cukup, nutrisi seimbang, aktivitas fisik teratur",
                "Cari makna dan tujuan dalam pekerjaan Anda",
                "Jangan ragu untuk meminta bantuan ketika dibutuhkan"
            ]
        });

        return recommendations;
    };

    const isComplete = BURNOUT_QUESTIONS.every((_, i) => answers[i] !== undefined);

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <header>
                <h1 className="text-3xl font-bold mb-2">Maslach Burnout Inventory (MBI)</h1>
                <p className="text-[var(--muted-foreground)]">
                    Inventaris standar untuk mengukur burnout profesional. Jawab berdasarkan seberapa sering
                    Anda mengalami perasaan ini dalam pekerjaan Anda.
                </p>
            </header>

            {!result ? (
                <div className="space-y-6">
                    {BURNOUT_QUESTIONS.map((q, i) => (
                        <div key={i} className="card p-6">
                            <p className="font-medium mb-4">{i + 1}. {q.text}</p>
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
                            Lihat Hasil
                        </button>
                    </div>
                </div>
            ) : (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
                    <div className="card text-center py-8 bg-gradient-to-br from-[var(--card)] to-[var(--muted)]">
                        <h3 className="text-lg text-[var(--muted-foreground)] mb-2">Tingkat Risiko Burnout Keseluruhan</h3>
                        <div className={`text-5xl font-bold mb-2 ${result.overall === 'Tinggi' ? 'text-red-600' :
                                result.overall === 'Sedang' ? 'text-orange-600' :
                                    'text-green-600'
                            }`}>
                            {result.overall}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="card text-center py-6">
                            <h3 className="text-sm font-medium text-[var(--muted-foreground)] mb-2">Kelelahan Emosional</h3>
                            <div className={`text-3xl font-bold mb-2 ${result.exhaustion.color === 'red' ? 'text-red-600' :
                                    result.exhaustion.color === 'orange' ? 'text-orange-600' :
                                        'text-green-600'
                                }`}>
                                {result.exhaustion.score}
                            </div>
                            <div className="text-sm font-medium">{result.exhaustion.level}</div>
                        </div>

                        <div className="card text-center py-6">
                            <h3 className="text-sm font-medium text-[var(--muted-foreground)] mb-2">Depersonalisasi</h3>
                            <div className={`text-3xl font-bold mb-2 ${result.depersonalization.color === 'red' ? 'text-red-600' :
                                    result.depersonalization.color === 'orange' ? 'text-orange-600' :
                                        'text-green-600'
                                }`}>
                                {result.depersonalization.score}
                            </div>
                            <div className="text-sm font-medium">{result.depersonalization.level}</div>
                        </div>

                        <div className="card text-center py-6">
                            <h3 className="text-sm font-medium text-[var(--muted-foreground)] mb-2">Pencapaian Pribadi</h3>
                            <div className={`text-3xl font-bold mb-2 ${result.accomplishment.color === 'red' ? 'text-red-600' :
                                    result.accomplishment.color === 'orange' ? 'text-orange-600' :
                                        'text-green-600'
                                }`}>
                                {result.accomplishment.score}
                            </div>
                            <div className="text-sm font-medium">{result.accomplishment.level}</div>
                        </div>
                    </div>

                    <div className="card">
                        <h3 className="text-xl font-semibold mb-4">Rekomendasi & Rencana Tindakan</h3>
                        <div className="space-y-6">
                            {getRecommendations(result).map((rec, i) => (
                                <div key={i} className="border-l-4 border-[var(--primary)] pl-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-semibold text-[var(--foreground)]">{rec.title}</h4>
                                        <span className="text-xs px-2 py-1 bg-[var(--muted)] rounded-full">{rec.severity}</span>
                                    </div>
                                    <ul className="list-disc list-inside space-y-2 text-sm text-[var(--muted-foreground)]">
                                        {rec.items.map((item, j) => (
                                            <li key={j} className="leading-relaxed">{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 p-4 bg-red-900/20 border border-red-900/50 rounded-lg">
                            <p className="text-sm text-red-200">
                                <strong>⚠️ Peringatan:</strong> Burnout adalah kondisi serius yang dapat berdampak pada kesehatan fisik dan mental.
                                Jika Anda mengalami gejala burnout yang parah atau berkepanjangan, sangat penting untuk segera mencari bantuan
                                profesional kesehatan mental. Jangan menunda untuk mendapatkan dukungan yang Anda butuhkan.
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
