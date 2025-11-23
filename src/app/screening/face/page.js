"use client";

import { useState, useRef, useEffect } from 'react';
import { analyzeFace } from '@/lib/mockAI';
import Link from 'next/link';

import NavigationControls from '@/components/ui/NavigationControls';

export default function FaceScreeningPage() {
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                setIsCameraOpen(true);
                setResult(null);
            }
        } catch (err) {
            console.error("Error accessing camera:", err);
            alert("Tidak dapat mengakses kamera. Pastikan Anda telah memberikan izin.");
        }
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            videoRef.current.srcObject.getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
            setIsCameraOpen(false);
        }
    };

    const captureAndAnalyze = async () => {
        if (!videoRef.current || !canvasRef.current) return;

        // Draw video frame to canvas
        const context = canvasRef.current.getContext('2d');
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);

        // Stop camera after capture
        stopCamera();

        setIsAnalyzing(true);
        try {
            // Pass dummy blob
            const data = await analyzeFace(new Blob());
            setResult(data);
        } catch (error) {
            console.error("Analysis failed", error);
        } finally {
            setIsAnalyzing(false);
        }
    };

    useEffect(() => {
        return () => {
            stopCamera();
        };
    }, []);

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <header>
                <h1 className="text-3xl font-bold mb-2">Analisis Ekspresi Wajah</h1>
                <p className="text-[var(--muted-foreground)]">
                    AI kami menganalisis ekspresi mikro untuk mendeteksi tanda-tanda kelelahan, stres, atau tekanan emosional.
                    Video Anda diproses secara lokal dan tidak pernah disimpan.
                </p>
            </header>

            <div className="card flex flex-col items-center justify-center py-8 space-y-6 min-h-[400px]">
                {!isCameraOpen && !result && !isAnalyzing && (
                    <div className="text-center space-y-4">
                        <div className="w-24 h-24 rounded-full bg-[var(--muted)] flex items-center justify-center mx-auto text-4xl">
                            📷
                        </div>
                        <p className="text-[var(--muted-foreground)] max-w-md mx-auto">
                            Pastikan Anda berada di lingkungan yang cukup terang dan wajah Anda terlihat jelas.
                        </p>
                        <button onClick={startCamera} className="btn btn-primary">
                            Buka Kamera
                        </button>
                    </div>
                )}

                {isCameraOpen && (
                    <div className="relative w-full max-w-md aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            className="w-full h-full object-cover transform scale-x-[-1]" // Mirror effect
                        />
                        <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                            <button
                                onClick={captureAndAnalyze}
                                className="btn btn-primary rounded-full px-8 shadow-xl border-2 border-white/20"
                            >
                                Tangkap & Analisis
                            </button>
                        </div>
                    </div>
                )}

                {isAnalyzing && (
                    <div className="text-center space-y-4">
                        <div className="w-16 h-16 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin mx-auto"></div>
                        <p className="text-[var(--muted-foreground)]">Memindai penanda wajah...</p>
                    </div>
                )}

                {/* Hidden canvas for capture */}
                <canvas ref={canvasRef} width={640} height={480} className="hidden" />

                {result && (
                    <div className="w-full space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="card bg-[var(--card)] border-[var(--border)] p-6 text-center">
                                <h3 className="text-lg font-medium text-[var(--muted-foreground)] mb-2">Tingkat Kelelahan</h3>
                                <div className="text-4xl font-bold text-purple-600">{result.fatigue}%</div>
                            </div>
                            <div className="card bg-[var(--card)] border-[var(--border)] p-6 text-center">
                                <h3 className="text-lg font-medium text-[var(--muted-foreground)] mb-2">Emosi Dominan</h3>
                                <div className="text-4xl font-bold text-blue-600">{result.emotion}</div>
                            </div>
                        </div>

                        <div className="card bg-[var(--card)] border-[var(--border)]">
                            <h3 className="text-xl font-semibold mb-4">Insight Wajah</h3>
                            <div className="space-y-4">
                                <div>
                                    <span className="text-sm font-medium text-[var(--muted-foreground)]">Penanda Terdeteksi:</span>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {result.stress_markers.map((marker, i) => (
                                            <span key={i} className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm font-medium border border-red-100">
                                                {marker}
                                            </span>
                                        ))}
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
                                            <strong>Privasi:</strong> Semua analisis dilakukan secara lokal. Tidak ada gambar atau video yang disimpan.
                                            Hasil ini adalah indikator awal dan sebaiknya dikombinasikan dengan metode skrining lainnya.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center gap-4">
                            <button onClick={() => { setResult(null); startCamera(); }} className="btn btn-outline">Coba Lagi</button>
                        </div>
                    </div>
                )}
            </div>

            <NavigationControls />
        </div>
    );
}
