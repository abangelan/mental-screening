
export const analyzeText = async (text) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simple keyword matching for demo purposes
    const keywords = [];
    const lowerText = text.toLowerCase();

    if (lowerText.includes('sedih') || lowerText.includes('menangis') || lowerText.includes('hampa')) keywords.push('Indikasi Depresi');
    if (lowerText.includes('takut') || lowerText.includes('cemas') || lowerText.includes('gugup')) keywords.push('Indikasi Kecemasan');
    if (lowerText.includes('lelah') || lowerText.includes('capek') || lowerText.includes('pusing')) keywords.push('Indikasi Stres Fisik');
    if (lowerText.includes('marah') || lowerText.includes('kesal')) keywords.push('Emosi Labil');

    return {
        stress: Math.floor(Math.random() * 40) + 10,
        anxiety: Math.floor(Math.random() * 40) + 10,
        depression: Math.floor(Math.random() * 40) + 10,
        burnout: Math.floor(Math.random() * 40) + 10,
        keywords: keywords.length > 0 ? keywords : ['Umum'],
        recommendations: [
            {
                category: "Manajemen Stres & Relaksasi",
                items: [
                    "Latihan Pernapasan 4-7-8: Tarik napas 4 detik, tahan 7 detik, hembuskan 8 detik. Ulangi 4 siklus.",
                    "Teknik Grounding 5-4-3-2-1: Sebutkan 5 hal yang dilihat, 4 diraba, 3 didengar, 2 dicium, 1 dirasa.",
                    "Progressive Muscle Relaxation: Kencangkan dan lemaskan otot tubuh dari kaki hingga kepala."
                ]
            },
            {
                category: "Perubahan Gaya Hidup",
                items: [
                    "Jurnal Syukur: Tuliskan 3 hal baik yang terjadi hari ini sebelum tidur.",
                    "Digital Detox: Kurangi penggunaan media sosial 1 jam sebelum tidur.",
                    "Aktivitas Fisik Ringan: Jalan kaki pagi selama 15 menit untuk meningkatkan mood."
                ]
            },
            {
                category: "Tindakan Lanjut",
                items: [
                    "Bicaralah dengan orang terpercaya (teman dekat atau keluarga) tentang perasaan Anda.",
                    "Jika perasaan ini menetap lebih dari 2 minggu, pertimbangkan konsultasi dengan psikolog.",
                    "Gunakan aplikasi meditasi untuk membantu menenangkan pikiran."
                ]
            }
        ]
    };
};

export const analyzeVoice = async (audioBlob) => {
    await new Promise(resolve => setTimeout(resolve, 2000));

    return {
        stress: Math.floor(Math.random() * 30) + 20,
        anxiety: Math.floor(Math.random() * 30) + 20,
        tone: ['Gugup', 'Datar', 'Cepat', 'Lambat'][Math.floor(Math.random() * 4)],
        pitch_stability: ['Stabil', 'Sedikit Bergetar', 'Tidak Stabil'][Math.floor(Math.random() * 3)],
        recommendations: [
            {
                category: "Latihan Vokal & Pernapasan",
                items: [
                    "Humming (Bergumam): Lakukan gumaman nada rendah untuk menenangkan saraf vagus.",
                    "Pernapasan Diafragma: Fokus napas perut agar suara lebih stabil dan tenang.",
                    "Minum air hangat untuk merelaksasi pita suara dan otot leher yang tegang."
                ]
            },
            {
                category: "Komunikasi & Ekspresi",
                items: [
                    "Latihan bicara perlahan: Coba kurangi kecepatan bicara untuk mengurangi kecemasan.",
                    "Rekam dan dengarkan kembali: Evaluasi nada bicara Anda secara objektif.",
                    "Bernyanyi lagu favorit: Cara ampuh melepaskan ketegangan emosional."
                ]
            }
        ]
    };
};

export const analyzeFace = async (imageBlob) => {
    await new Promise(resolve => setTimeout(resolve, 2000));

    return {
        fatigue: Math.floor(Math.random() * 40) + 20,
        stress: Math.floor(Math.random() * 40) + 20,
        emotion: ['Netral', 'Sedih', 'Lelah', 'Tegang'][Math.floor(Math.random() * 4)],
        stress_markers: ['Ketegangan Dahi', 'Mata Lelah', 'Sudut Bibir Turun'].slice(0, Math.floor(Math.random() * 3) + 1),
        recommendations: [
            {
                category: "Pemulihan Fisik",
                items: [
                    "Kompres Mata: Gunakan handuk hangat pada mata selama 5-10 menit.",
                    "Pijat Wajah Ringan: Pijat area pelipis dan rahang untuk mengurangi ketegangan.",
                    "Atur Pola Tidur: Usahakan tidur 7-8 jam dan hindari layar sebelum tidur."
                ]
            },
            {
                category: "Kesehatan Emosional",
                items: [
                    "Senyum Latihan: Cobalah tersenyum di depan cermin selama 1 menit (biofeedback positif).",
                    "Istirahat Mikro: Ambil jeda 5 menit setiap jam kerja untuk meregangkan badan.",
                    "Hidrasi: Pastikan minum cukup air, dehidrasi dapat memperburuk tampilan lelah."
                ]
            }
        ]
    };
};
