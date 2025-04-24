// /components/Sidebar.tsx
'use client';

import Link from 'next/link';
import { LayoutDashboard, Users, Calendar, DollarSign, BarChart2, Megaphone } from 'lucide-react';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { label: 'Departments', icon: Users, href: '/departments' },
  { label: 'Leave', icon: Calendar, href: '/leave' },
  { label: 'Payroll', icon: DollarSign, href: '/payroll' },
  { label: 'Performance', icon: BarChart2, href: '/performance' },
  { label: 'Announcements', icon: Megaphone, href: '/announcements' },
];

export default function Sidebar() {
  return (
    <aside className="hidden md:flex md:flex-col w-50 bg-white border-r min-h-screen px-4 py-6">
      <div className="flex flex-col gap-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 text-gray-700 hover:text-blue-600 font-medium transition"
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </Link>
        ))}
      </div>
    </aside>
  );
}
