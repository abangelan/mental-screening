"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser } from '@/context/UserContext';

export default function Sidebar() {
    const pathname = usePathname();
    const { role } = useUser();

    const patientLinks = [
        { href: '/dashboard', label: 'Beranda' },
        { href: '/screening/text', label: 'Skrining Teks' },
        { href: '/screening/voice', label: 'Analisis Suara' },
        { href: '/screening/face', label: 'Analisis Wajah' },
        { href: '/screening/test/standard', label: 'Tes Standar' },
    ];

    const nakesLinks = [
        { href: '/dashboard', label: 'Beranda' },
        { href: '/screening/burnout', label: 'Cek Burnout' },
        { href: '/patients', label: 'Data Pasien' },
        { href: '/stats', label: 'Statistik' },
    ];

    const links = role === 'nakes' ? nakesLinks : patientLinks;

    return (
        <aside className="w-64 border-r border-[var(--border)] bg-[var(--card)] hidden md:flex flex-col h-[calc(100vh-4rem)] sticky top-16">
            <div className="p-4 space-y-2">
                {links.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`block px-4 py-2 rounded-md text-sm font-medium transition-colors ${isActive
                                ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                                : 'text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]'
                                }`}
                        >
                            {link.label}
                        </Link>
                    );
                })}
            </div>

            <div className="mt-auto p-4 border-t border-[var(--border)]">
                <Link href="/" className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] flex items-center gap-2">
                    <span>← Keluar</span>
                </Link>
            </div>
        </aside>
    );
}
