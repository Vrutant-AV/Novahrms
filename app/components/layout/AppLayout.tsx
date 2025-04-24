'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Sidebar from '../Sidebar';
import Navbar from '../Navbar';

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const pathname = usePathname();
  const { user, loading } = useAuth();

  const unauthRoutes = ['/login', '/register', '/forgot-password', '/reset-password'];
  const isAuthPage = unauthRoutes.includes(pathname);

  if (loading) {
    return <main className="min-h-screen flex items-center justify-center text-lg">Loading...</main>;
  }

  if (!user && !isAuthPage) {
    return <main className="min-h-screen flex items-center justify-center text-red-500">
      Unauthorized. Please log in.
    </main>;
  }

  return user && !isAuthPage ? (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="p-4 overflow-y-auto">{children}</main>
      </div>
    </div>
  ) : (
    <main className="min-h-screen">{children}</main>
  );
};

export default AppLayout;
