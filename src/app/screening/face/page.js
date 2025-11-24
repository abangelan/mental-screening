"use client";

import { useState, useRef, useEffect } from 'react';
import { analyzeFace } from '@/lib/mockAI';
import Link from 'next/link';

import NavigationControls from '@/components/ui/NavigationControls';

import PrivacyNotice from '@/components/ui/PrivacyNotice';

export default function FaceScreeningPage() {
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null); // Added error state
    const [stream, setStream] = useState(null); // Added stream state
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const [facingMode, setFacingMode] = useState('user'); // 'user' = front, 'environment' = back

    const startCamera = async (preferredFacingMode = facingMode) => {
        try {
            setError(null);

            // Stop any existing stream first
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }

            // Use simpler constraints that work across more devices
            const constraints = {
                video: {
                    facingMode: preferredFacingMode,
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                },
                audio: false
            };

            const newStream = await navigator.mediaDevices.getUserMedia(constraints);

            if (videoRef.current) {
                videoRef.current.srcObject = newStream;
                // IMPORTANT: Play the video to show camera feed
                videoRef.current.onloadedmetadata = () => {
                    videoRef.current.play().catch(err => {
                        console.error('Error playing video:', err);
                        setError('Tidak dapat memutar video kamera. Coba refresh halaman.');
                    });
                };
            }

            setStream(newStream);
            setIsCameraOpen(true);
            setResult(null);
            setFacingMode(preferredFacingMode);
        } catch (err) {
            console.error('Camera access error:', err);
            let errorMessage = 'Tidak dapat mengakses kamera. ';

            if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
                errorMessage += 'Kamera tidak ditemukan. Pastikan perangkat Anda memiliki kamera.';
            } else if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
                errorMessage += 'Akses kamera ditolak. Silakan izinkan akses kamera di pengaturan browser Anda.';
            } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
                errorMessage += 'Kamera sedang digunakan oleh aplikasi lain. Tutup aplikasi lain yang menggunakan kamera.';
            } else if (err.name === 'OverconstrainedError') {
                errorMessage += 'Pengaturan kamera tidak didukung. Mencoba dengan pengaturan default...';
                // Try again with minimal constraints
                try {
                    const fallbackStream = await navigator.mediaDevices.getUserMedia({
                        video: { facingMode: preferredFacingMode },
                        audio: false
                    });
                    if (videoRef.current) {
                        videoRef.current.srcObject = fallbackStream;
                        videoRef.current.onloadedmetadata = () => {
                            videoRef.current.play().catch(err => console.error('Play error:', err));
                        };
                    }
                    setStream(fallbackStream);
                    setIsCameraOpen(true);
                    setResult(null);
                    setFacingMode(preferredFacingMode);
                    return; // Success with fallback
                } catch (fallbackErr) {
                    errorMessage = 'Tidak dapat mengakses kamera dengan pengaturan apapun.';
                }
            } else {
                errorMessage += `Error: ${err.message}`;
            }

            setError(errorMessage);
            setIsCameraOpen(false);
        }
    };

    const toggleCamera = () => {
        const newFacingMode = facingMode === 'user' ? 'environment' : 'user';
        startCamera(newFacingMode);
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            videoRef.current.srcObject.getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
        setIsCameraOpen(false);
        setStream(null);
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
            <NavigationControls />
            <PrivacyNotice />

            <header>
                <h1 className="text-3xl font-bold mb-2">Analisis Ekspresi Wajah</h1>
                <p className="text-[var(--muted-foreground)]">
                    AI kami menganalisis ekspresi mikro untuk mendeteksi tanda-tanda kelelahan, stres, atau tekanan emosional.
                    Video Anda diproses secara lokal dan tidak pernah disimpan.
                </p>
            </header>

            {error && (
                <div className="card bg-red-900/20 border-red-900/50 p-4">
                    <p className="text-red-200 text-sm">
                        <strong>⚠️ Error:</strong> {error}
                    </p>
                    <button
                        onClick={() => { setError(null); startCamera(); }}
                        className="btn btn-outline mt-3 text-sm"
                    >
                        Coba Lagi
                    </button>
                </div>
            )}

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

                {isCameraOpen && !result && (
                    <div className="w-full space-y-4">
                        <div className="relative w-full max-w-md mx-auto">
                            <video
                                ref={videoRef}
                                autoPlay
                                playsInline
                                muted
                                className="w-full rounded-lg border-2 border-[var(--border)]"
                            />
                            <canvas ref={canvasRef} width="640" height="480" className="hidden" />
                        </div>
                        <div className="flex gap-3 justify-center flex-wrap">
                            <button onClick={toggleCamera} className="btn btn-outline text-sm">
                                🔄 {facingMode === 'user' ? 'Kamera Belakang' : 'Kamera Depan'}
                            </button>
                            <button onClick={captureAndAnalyze} className="btn btn-primary">
                                📸 Ambil Foto & Analisis
                            </button>
                            <button onClick={stopCamera} className="btn btn-outline">
                                ✕ Tutup
                            </button>
                        </div>
                    </div>
                )}{isAnalyzing && (
                    <div className="text-center space-y-4">
                        <div className="w-16 h-16 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin mx-auto"></div>
                        <p className="text-[var(--muted-foreground)]">Memindai penanda wajah...</p>
                    </div>
                )}

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
        </div>
    );
}
