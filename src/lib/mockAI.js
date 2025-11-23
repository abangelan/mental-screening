export async function analyzeText(text) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simple heuristic mock
    const length = text.length;
    const negativeWords = ['sedih', 'lelah', 'cemas', 'khawatir', 'putus asa', 'stres', 'burnout', 'sakit', 'sendiri', 'takut'];
    const positiveWords = ['senang', 'bahagia', 'semangat', 'harapan', 'tenang', 'santai', 'bersyukur'];

    let negativeScore = 0;
    let positiveScore = 0;

    const lowerText = text.toLowerCase();
    negativeWords.forEach(word => {
        if (lowerText.includes(word)) negativeScore += 1;
    });
    positiveWords.forEach(word => {
        if (lowerText.includes(word)) positiveScore += 1;
    });

    // Generate scores (0-100)
    const stress = Math.min(100, Math.max(10, 30 + (negativeScore * 10) - (positiveScore * 5) + (Math.random() * 10)));
    const anxiety = Math.min(100, Math.max(10, 25 + (negativeScore * 8) - (positiveScore * 4) + (Math.random() * 10)));
    const depression = Math.min(100, Math.max(5, 20 + (negativeScore * 12) - (positiveScore * 6) + (Math.random() * 10)));
    const burnout = Math.min(100, Math.max(10, 35 + (negativeScore * 9) - (positiveScore * 3) + (Math.random() * 10)));

    const getDetailedRecommendations = (stress, anxiety, depression, burnout) => {
        const recommendations = [];

        // Stress recommendations
        if (stress > 60) {
            recommendations.push({
                category: "Manajemen Stres Tinggi",
                items: [
                    "Praktikkan teknik pernapasan 4-7-8: tarik napas 4 detik, tahan 7 detik, buang 8 detik. Ulangi 4-5 kali.",
                    "Lakukan progressive muscle relaxation: kencangkan dan lepaskan setiap kelompok otot dari kaki hingga kepala.",
                    "Identifikasi sumber stres utama dan buat rencana konkret untuk mengatasinya.",
                    "Batasi konsumsi kafein dan gula yang dapat memperburuk kecemasan.",
                    "Pertimbangkan konsultasi dengan profesional kesehatan mental jika stres berlanjut lebih dari 2 minggu."
                ]
            });
        } else if (stress > 30) {
            recommendations.push({
                category: "Manajemen Stres Sedang",
                items: [
                    "Luangkan waktu 10-15 menit sehari untuk meditasi atau mindfulness.",
                    "Buat jadwal harian yang realistis dengan waktu istirahat yang cukup.",
                    "Olahraga ringan 20-30 menit seperti jalan kaki atau yoga.",
                    "Praktikkan time management dan prioritaskan tugas penting."
                ]
            });
        }

        // Anxiety recommendations
        if (anxiety > 60) {
            recommendations.push({
                category: "Mengatasi Kecemasan Tinggi",
                items: [
                    "Gunakan teknik grounding 5-4-3-2-1: sebutkan 5 hal yang Anda lihat, 4 yang Anda dengar, 3 yang Anda sentuh, 2 yang Anda cium, 1 yang Anda rasakan.",
                    "Tuliskan kekhawatiran Anda di jurnal, lalu evaluasi apakah realistis atau tidak.",
                    "Hindari overthinking dengan membatasi waktu untuk 'worry time' hanya 15 menit per hari.",
                    "Praktikkan self-compassion: perlakukan diri sendiri seperti Anda memperlakukan teman yang sedang cemas.",
                    "Pertimbangkan terapi CBT (Cognitive Behavioral Therapy) yang terbukti efektif untuk kecemasan."
                ]
            });
        } else if (anxiety > 30) {
            recommendations.push({
                category: "Mengurangi Kecemasan",
                items: [
                    "Batasi paparan berita negatif dan media sosial.",
                    "Praktikkan aktivitas yang menenangkan seperti mendengarkan musik atau membaca.",
                    "Berbicara dengan orang terpercaya tentang perasaan Anda.",
                    "Coba teknik visualization: bayangkan tempat yang tenang dan damai."
                ]
            });
        }

        // Depression recommendations
        if (depression > 60) {
            recommendations.push({
                category: "Dukungan untuk Depresi",
                items: [
                    "PENTING: Segera konsultasikan dengan psikolog atau psikiater profesional.",
                    "Jangan isolasi diri - tetap terhubung dengan keluarga dan teman, meskipun sulit.",
                    "Tetapkan rutinitas harian sederhana: bangun, mandi, makan pada waktu yang sama.",
                    "Lakukan aktivitas fisik ringan meskipun tidak ada motivasi - bahkan 5 menit berjalan membantu.",
                    "Hindari keputusan besar saat sedang depresi.",
                    "Jika ada pikiran untuk menyakiti diri, segera hubungi hotline krisis atau rumah sakit terdekat."
                ]
            });
        } else if (depression > 30) {
            recommendations.push({
                category: "Meningkatkan Mood",
                items: [
                    "Lakukan aktivitas yang dulu Anda nikmati, meskipun tidak terasa menyenangkan sekarang.",
                    "Tuliskan 3 hal yang Anda syukuri setiap hari.",
                    "Jaga pola tidur: tidur dan bangun pada waktu yang sama.",
                    "Pastikan nutrisi yang cukup dan hindari melewatkan makan.",
                    "Pertimbangkan untuk bergabung dengan support group atau komunitas."
                ]
            });
        }

        // Burnout recommendations
        if (burnout > 60) {
            recommendations.push({
                category: "Pemulihan dari Burnout",
                items: [
                    "Evaluasi beban kerja dengan atasan - diskusikan redistribusi tugas atau cuti.",
                    "Tetapkan batasan yang jelas antara waktu kerja dan pribadi.",
                    "Praktikkan 'digital detox': matikan notifikasi kerja di luar jam kerja.",
                    "Cari kembali makna dan tujuan dalam pekerjaan Anda.",
                    "Pertimbangkan career counseling jika burnout terkait ketidakcocokan pekerjaan.",
                    "Prioritaskan self-care: tidur 7-9 jam, olahraga teratur, hobi yang menyenangkan."
                ]
            });
        } else if (burnout > 30) {
            recommendations.push({
                category: "Mencegah Burnout",
                items: [
                    "Ambil istirahat teratur selama hari kerja (5-10 menit setiap 1-2 jam).",
                    "Delegasikan tugas jika memungkinkan.",
                    "Praktikkan work-life balance: hindari membawa pekerjaan pulang.",
                    "Rayakan pencapaian kecil untuk meningkatkan motivasi."
                ]
            });
        }

        // General wellness recommendations
        if (recommendations.length === 0 || (stress < 30 && anxiety < 30 && depression < 30 && burnout < 30)) {
            recommendations.push({
                category: "Pertahankan Kesehatan Mental",
                items: [
                    "Terus praktikkan self-care dan mindfulness secara rutin.",
                    "Jaga pola tidur, nutrisi, dan olahraga yang sehat.",
                    "Pertahankan hubungan sosial yang positif.",
                    "Lakukan skrining berkala untuk deteksi dini.",
                    "Tetap waspada terhadap perubahan mood atau stres."
                ]
            });
        }

        return recommendations;
    };

    const recommendations = getDetailedRecommendations(
        Math.round(stress),
        Math.round(anxiety),
        Math.round(depression),
        Math.round(burnout)
    );

    return {
        stress: Math.round(stress),
        anxiety: Math.round(anxiety),
        depression: Math.round(depression),
        burnout: Math.round(burnout),
        sentiment: negativeScore > positiveScore ? 'Negatif' : 'Positif',
        keywords: negativeWords.filter(w => lowerText.includes(w)),
        recommendations: recommendations
    };
}

export async function analyzeVoice(audioBlob) {
    await new Promise(resolve => setTimeout(resolve, 2000));

    const stress = Math.round(40 + Math.random() * 40);
    const anxiety = Math.round(30 + Math.random() * 30);

    const recommendations = [];

    if (stress > 60 || anxiety > 60) {
        recommendations.push({
            category: "Teknik Pernapasan & Relaksasi",
            items: [
                "Praktikkan pernapasan diafragma: letakkan tangan di perut, tarik napas perlahan hingga perut mengembang.",
                "Lakukan box breathing: tarik napas 4 detik, tahan 4 detik, buang 4 detik, tahan 4 detik. Ulangi 5 kali.",
                "Coba progressive muscle relaxation untuk melepaskan ketegangan fisik.",
                "Minum air putih hangat untuk menenangkan tenggorokan dan sistem saraf."
            ]
        });
        recommendations.push({
            category: "Manajemen Vokal & Komunikasi",
            items: [
                "Perlambat kecepatan bicara Anda - ambil jeda sebelum merespons.",
                "Praktikkan berbicara dengan nada yang lebih rendah dan tenang.",
                "Hindari berbicara terlalu cepat saat cemas - fokus pada artikulasi yang jelas.",
                "Latihan vokal sederhana: hum dengan nada rendah untuk menenangkan pita suara."
            ]
        });
    } else if (stress > 30 || anxiety > 30) {
        recommendations.push({
            category: "Menenangkan Diri",
            items: [
                "Ambil napas dalam sebelum berbicara untuk menstabilkan suara.",
                "Minum air putih secara teratur untuk menjaga hidrasi pita suara.",
                "Praktikkan mindful speaking: fokus pada kata-kata yang Anda ucapkan.",
                "Lakukan peregangan leher dan bahu untuk mengurangi ketegangan."
            ]
        });
    } else {
        recommendations.push({
            category: "Pertahankan Kesehatan Vokal",
            items: [
                "Terus praktikkan teknik pernapasan yang baik.",
                "Jaga hidrasi dengan minum air putih yang cukup.",
                "Hindari berteriak atau berbicara terlalu keras.",
                "Istirahatkan suara Anda secara berkala."
            ]
        });
    }

    return {
        stress: stress,
        anxiety: anxiety,
        pitch_stability: stress > 50 ? "Tidak Stabil" : "Cukup Stabil",
        tone: anxiety > 50 ? "Cemas" : "Tenang",
        recommendations: recommendations
    };
}

export async function analyzeFace(imageBlob) {
    await new Promise(resolve => setTimeout(resolve, 2000));

    const fatigue = Math.round(20 + Math.random() * 60);
    const stress_level = Math.round(30 + Math.random() * 50);

    const stress_markers = [];
    if (fatigue > 50) stress_markers.push("Lingkaran hitam terdeteksi");
    if (stress_level > 50) stress_markers.push("Ketegangan pada rahang");
    if (Math.random() > 0.5) stress_markers.push("Kerutan dahi");
    if (Math.random() > 0.6) stress_markers.push("Mata lelah");

    const recommendations = [];

    if (fatigue > 60) {
        recommendations.push({
            category: "Pemulihan dari Kelelahan Tinggi",
            items: [
                "Prioritaskan tidur berkualitas 7-9 jam per malam dengan rutinitas tidur yang konsisten.",
                "Hindari screen time 1 jam sebelum tidur untuk meningkatkan kualitas tidur.",
                "Praktikkan power nap 15-20 menit di siang hari jika memungkinkan.",
                "Konsumsi makanan bergizi tinggi dan hindari kafein berlebihan.",
                "Pertimbangkan suplemen vitamin B kompleks dan magnesium (konsultasi dokter terlebih dahulu).",
                "Lakukan pemeriksaan kesehatan jika kelelahan berlanjut lebih dari 2 minggu."
            ]
        });
    } else if (fatigue > 30) {
        recommendations.push({
            category: "Mengurangi Kelelahan",
            items: [
                "Atur jadwal tidur yang teratur - tidur dan bangun pada waktu yang sama.",
                "Lakukan stretching ringan atau yoga untuk meningkatkan energi.",
                "Pastikan hidrasi yang cukup - minum 8 gelas air per hari.",
                "Ambil istirahat singkat setiap 1-2 jam saat bekerja."
            ]
        });
    }

    if (stress_markers.length > 2) {
        recommendations.push({
            category: "Perawatan Wajah & Relaksasi",
            items: [
                "Pijat wajah lembut dengan gerakan memutar untuk mengurangi ketegangan otot.",
                "Kompres dingin pada mata selama 10 menit untuk mengurangi bengkak.",
                "Praktikkan facial yoga atau latihan relaksasi wajah.",
                "Gunakan eye cream atau gel untuk mengurangi lingkaran hitam.",
                "Lakukan facial massage dengan minyak esensial lavender untuk relaksasi.",
                "Pertimbangkan akupresur pada titik-titik wajah untuk meredakan stres."
            ]
        });
        recommendations.push({
            category: "Manajemen Stres Mental",
            items: [
                "Praktikkan meditasi mindfulness 10-15 menit setiap hari.",
                "Lakukan journaling untuk mengekspresikan emosi dan pikiran.",
                "Batasi paparan stressor dan belajar mengatakan 'tidak'.",
                "Cari dukungan sosial dari keluarga atau teman terpercaya."
            ]
        });
    } else if (stress_markers.length > 0) {
        recommendations.push({
            category: "Perawatan Diri",
            items: [
                "Istirahatkan mata secara teratur jika bekerja dengan layar.",
                "Lakukan peregangan wajah dan leher untuk mengurangi ketegangan.",
                "Pastikan pencahayaan yang baik saat bekerja atau membaca.",
                "Praktikkan teknik relaksasi seperti pernapasan dalam."
            ]
        });
    } else {
        recommendations.push({
            category: "Pertahankan Kesehatan Wajah",
            items: [
                "Terus jaga pola tidur yang sehat.",
                "Lakukan perawatan kulit wajah secara teratur.",
                "Praktikkan ekspresi wajah yang rileks.",
                "Lakukan skrining berkala untuk deteksi dini."
            ]
        });
    }

    return {
        fatigue: fatigue,
        emotion: fatigue > 50 ? "Lelah" : "Netral",
        stress_markers: stress_markers.length > 0 ? stress_markers : ["Tidak ada penanda stres signifikan"],
        recommendations: recommendations
    };
}
