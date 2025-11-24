"use client";

import { useState, useRef, useEffect } from 'react';
import { analyzeVoice } from '@/lib/mockAI';
import Link from 'next/link';

import NavigationControls from '@/components/ui/NavigationControls';

import PrivacyNotice from '@/components/ui/PrivacyNotice';

export default function VoiceScreeningPage() {
    const [isRecording, setIsRecording] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [result, setResult] = useState(null);
    const mediaRecorderRef = useRef(null);
    const timerRef = useRef(null);

    // ... (rest of the functions remain the same)

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            mediaRecorderRef.current.start();
            setIsRecording(true);
            setRecordingTime(0);
            setResult(null);

            timerRef.current = setInterval(() => {
                setRecordingTime(prev => prev + 1);
            }, 1000);
        } catch (err) {
            console.error("Error accessing microphone:", err);
            alert("Tidak dapat mengakses mikrofon. Pastikan Anda telah memberikan izin.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
            clearInterval(timerRef.current);
            setIsRecording(false);
            handleAnalyze(); // Auto analyze on stop for this demo
        }
    };

    const handleAnalyze = async () => {
        setIsAnalyzing(true);
        try {
            // Pass a dummy blob for now since we are mocking
            const data = await analyzeVoice(new Blob());
            setResult(data);
        } catch (error) {
            console.error("Analysis failed", error);
        } finally {
            setIsAnalyzing(false);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <NavigationControls />
            <PrivacyNotice />

            <header>
                <h1 className="text-3xl font-bold mb-2">Analisis Suara</h1>
                <p className="text-[var(--muted-foreground)]">
                    Rekam suara Anda saat membaca kalimat di bawah ini. AI kami akan menganalisis intonasi dan stabilitas suara Anda.
                </p>
            </header>

            {/* Guided Text Card */}
            <div className="card bg-blue-50/50 border-blue-100 p-6 text-center">
                <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3">Kalimat untuk Dibaca</h3>
                <p className="text-xl font-medium text-[var(--foreground)] leading-relaxed italic">
                    "Saya merasa hari ini cukup melelahkan, namun saya tetap berusaha melakukan yang terbaik.
                    Terkadang saya merasa cemas akan masa depan, tetapi saya ingin menjadi lebih tenang dan bahagia."
                </p>
            </div>

            <div className="card flex flex-col items-center justify-center py-16 space-y-8">
                <div className={`relative w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${isRecording ? 'bg-red-50' : 'bg-[var(--muted)]'}`}>
                    {isRecording && (
                        <div className="absolute inset-0 rounded-full border-4 border-red-500 animate-ping opacity-20"></div>
                    )}
                    <button
                        onClick={isRecording ? stopRecording : startRecording}
                        disabled={isAnalyzing}
                        className={`w-24 h-24 rounded-full flex items-center justify-center text-3xl shadow-lg transition-transform hover:scale-105 active:scale-95 ${isRecording
                            ? 'bg-red-500 text-white'
                            : 'bg-[var(--primary)] text-white'
                            }`}
                    >
                        {isRecording ? '⏹' : '🎙'}
                    </button>
                </div>

                <div className="text-center space-y-2">
                    <div className="text-4xl font-mono font-bold tabular-nums">
                        {formatTime(recordingTime)}
                    </div>
                    <p className="text-sm text-[var(--muted-foreground)]">
                        {isRecording ? 'Sedang merekam...' : isAnalyzing ? 'Menganalisis pola audio...' : 'Ketuk mikrofon untuk mulai'}
                    </p>
                </div>
            </div>

            {result && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="card bg-[var(--card)] border-[var(--border)] p-6 text-center">
                            <h3 className="text-lg font-medium text-[var(--muted-foreground)] mb-2">Tingkat Stres</h3>
                            <div className="text-4xl font-bold text-red-600">{result.stress}%</div>
                        </div>
                        <div className="card bg-[var(--card)] border-[var(--border)] p-6 text-center">
                            <h3 className="text-lg font-medium text-[var(--muted-foreground)] mb-2">Tingkat Kecemasan</h3>
                            <div className="text-4xl font-bold text-orange-600">{result.anxiety}%</div>
                        </div>
                    </div>

                    <div className="card bg-[var(--card)] border-[var(--border)]">
                        <h3 className="text-xl font-semibold mb-4">Insight Suara</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <span className="text-sm font-medium text-[var(--muted-foreground)]">Analisis Nada:</span>
                                <p className="text-lg font-medium mt-1">{result.tone}</p>
                            </div>
                            <div>
                                <span className="text-sm font-medium text-[var(--muted-foreground)]">Kestabilan Pitch:</span>
                                <p className="text-lg font-medium mt-1">{result.pitch_stability}</p>
                            </div>
                        </div>

                        <div className="mt-6">
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
                                    <strong>Catatan:</strong> Analisis suara adalah indikator awal. Untuk evaluasi yang lebih akurat,
                                    kombinasikan dengan metode skrining lainnya atau konsultasi profesional.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
