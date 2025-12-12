"use client";

import { AuthProvider, useAuth } from '@/contexts/auth-context';
import LoginView from '@/components/login-view';
import Dashboard from '@/components/dashboard/dashboard';
import { Toaster } from "@/components/ui/toaster"

function AppContent() {
    const { user } = useAuth();
    return user ? <Dashboard /> : <LoginView />;
}

export function PageClient() {
    return (
        <AuthProvider>
            <main className="min-h-screen bg-background font-body text-foreground">
                <AppContent />
                <Toaster />
            </main>
        </AuthProvider>
    );
}
