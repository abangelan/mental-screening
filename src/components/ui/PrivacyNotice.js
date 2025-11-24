"use client";

import { useState } from 'react';

export default function PrivacyNotice() {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 relative animate-in fade-in slide-in-from-top-2">
            <button
                onClick={() => setIsVisible(false)}
                className="absolute top-2 right-2 text-blue-400 hover:text-blue-600"
            >
                ✕
            </button>
            <div className="flex gap-3">
                <div className="text-2xl">🛡️</div>
                <div>
                    <h4 className="font-semibold text-blue-900">Privasi Anda Terjamin</h4>
                    <p className="text-sm text-blue-800 mt-1">
                        Hasil tes ini diproses secara lokal (on-device) dan <strong>TIDAK AKAN DISIMPAN</strong> di server manapun.
                        Data Anda hilang segera setelah Anda menutup halaman ini.
                    </p>
                </div>
            </div>
        </div>
    );
}
