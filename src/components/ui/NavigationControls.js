"use client";

import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NavigationControls({ nextPath, nextLabel = "Selanjutnya" }) {
    const router = useRouter();

    return (
        <div className="w-full space-y-6">
            {/* Top Navigation - Back and Home */}
            <div className="flex justify-between items-center pb-6 border-b border-[var(--border)]">
                <button
                    onClick={() => router.back()}
                    className="btn btn-outline flex items-center gap-3 text-lg px-8 py-4 hover:bg-[var(--muted)] transition-all text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                >
                    <span className="text-xl">←</span> Kembali
                </button>
                <Link href="/" className="btn flex items-center gap-3 text-lg px-8 py-4 text-[var(--primary)] border border-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-all shadow-sm">
                    Beranda
                </Link>
            </div>

            {/* Bottom Next Button (if provided) */}
            {nextPath && (
                <div className="flex justify-end pt-4 border-t border-[var(--border)]">
                    <Link href={nextPath} className="btn btn-primary flex items-center gap-2 text-base px-6 py-3">
                        {nextLabel} <span>→</span>
                    </Link>
                </div>
            )}
        </div>
    );
}
