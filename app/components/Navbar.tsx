// /components/Navbar.tsx
'use client';

import { Menu } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b shadow-sm bg-white dark:bg-gray-900 dark:text-white">
      <div className="flex items-center gap-2">
        <Menu className="h-6 w-6 md:hidden" />
        <img src="/logo.png" alt="Company Logo" className="h-8 w-auto" />
        <h1 className="text-lg font-semibold hidden md:block">NovaHRMS</h1>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full" />
      </div>
    </header>
  );
}
