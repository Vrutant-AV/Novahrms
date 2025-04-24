// /app/layout.tsx
import './globals.css';
import type { ReactNode } from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import AppLayout from './components/layout/AppLayout';

export const metadata = {
  title: 'NovaHRMS',
  description: 'Innovating Intelligence, Empowering People',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ThemeProvider>
            <AppLayout>{children}</AppLayout>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
