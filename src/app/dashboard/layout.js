"use client";

import { Suspense } from 'react';
import Navbar from '@/components/layout/Navbar';
import { UserProvider } from '@/context/UserContext';

function DashboardContent({ children }) {
    return (
        <div className="min-h-screen flex flex-col bg-[var(--background)]">
            <Navbar />
            <main className="flex-1 container mx-auto max-w-7xl p-6">
                {children}
            </main>
        </div>
    );
}

export default function DashboardLayout({ children }) {
    return (
        <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
            <UserProvider>
                <DashboardContent>{children}</DashboardContent>
            </UserProvider>
        </Suspense>
    );
}
