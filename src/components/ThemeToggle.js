'use client';

import { useTheme } from '@/context/ThemeContext';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="relative w-14 h-7 rounded-full bg-[var(--secondary)] border border-[var(--border)] transition-all duration-300 hover:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 focus:ring-offset-[var(--background)]"
            aria-label="Toggle theme"
        >
            <div
                className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-[var(--primary)] transition-transform duration-300 flex items-center justify-center text-xs ${theme === 'light' ? 'translate-x-7' : 'translate-x-0'
                    }`}
            >
                {theme === 'dark' ? '🌙' : '☀️'}
            </div>
        </button>
    );
}
