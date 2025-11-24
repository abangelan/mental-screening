"use client";

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    const links = [
        { href: '/', label: 'Beranda' },
        { href: '/screening/text', label: 'Skrining Teks' },
        { href: '/screening/voice', label: 'Analisis Suara' },
        { href: '/screening/face', label: 'Analisis Wajah' },
        { href: '/screening/test/standard', label: 'Kuesioner' },
    ];

    return (
        <nav className="h-16 border-b border-[var(--border)] bg-[var(--card)]/80 backdrop-blur-md sticky top-0 z-50 flex items-center px-6 justify-between">
            <div className="flex items-center gap-8">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[var(--primary)] flex items-center justify-center text-white font-bold">
                        AI
                    </div>
                    <span className="font-bold text-lg tracking-tight text-[var(--foreground)] hidden sm:block">MentalScreening</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-1">
                    {links.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive
                                    ? 'bg-[var(--primary)] text-white'
                                    : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)]'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </div>
            </div>

            <div className="flex items-center gap-4">
                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden p-2 text-[var(--foreground)]"
                >
                    {isMenuOpen ? '✕' : '☰'}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className="absolute top-16 left-0 w-full bg-[var(--card)] border-b border-[var(--border)] p-4 flex flex-col gap-2 md:hidden shadow-lg animate-fade-in">
                    {links.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className={`block px-4 py-3 rounded-md text-sm font-medium transition-colors ${isActive
                                    ? 'bg-[var(--primary)] text-white'
                                    : 'text-[var(--foreground)] hover:bg-[var(--muted)]'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                    <div className="border-t border-[var(--border)] pt-2 mt-2">
                        <Link href="/" className="px-4 py-3 text-red-500 hover:bg-red-50 rounded-md block" onClick={() => setIsMenuOpen(false)}>
                            Keluar
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
