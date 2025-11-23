"use client";

import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NavigationControls({ nextPath, nextLabel = "Selanjutnya" }) {
    const router = useRouter();

    return (
        <div className="flex items-center justify-between w-full py-4 mt-8 border-t border-[var(--border)] animate-fade-in delay-300">
            <div className="flex gap-3">
                <button
                    onClick={() => router.back()}
                    className="btn btn-outline flex items-center gap-2 text-sm"
                >
                    <span>←</span> Kembali
                </button>
                <Link href="/dashboard" className="btn btn-outline flex items-center gap-2 text-sm">
                    Beranda
                </Link>
            </div>

            {nextPath && (
                <Link href={nextPath} className="btn btn-primary flex items-center gap-2 text-sm">
                    {nextLabel} <span>→</span>
                </Link>
            )}
        </div>
    );
}
