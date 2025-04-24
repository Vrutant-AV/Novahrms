'use client';

import { useAuth } from '@/context/AuthContext';
import styles from './Dashboard.module.css';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const role = user?.role;

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (!user) {
    return <div className={styles.unauthorized}>Unauthorized. Please log in.</div>;
  }

  return (
    <main className={styles.dashboard}>
      <h1 className={styles.title}>Welcome, {user.name} 👋</h1>
      <h2 className={styles.subtitle}>Role: {role}</h2>

      <section className={styles.cards}>
        {(role === 'admin' || role === 'hr') && (
          <>
            <div className={styles.card}>
              <h2>👥 Employees</h2>
              <p>230 total</p>
            </div>
            <div className={styles.card}>
              <h2>📆 Leaves</h2>
              <p>18 pending approvals</p>
            </div>
            <div className={styles.card}>
              <h2>💸 Payroll</h2>
              <p>₹1.2 cr processed this month</p>
            </div>
          </>
        )}

        {role === 'employee' && (
          <>
            <div className={styles.card}>
              <h2>📅 Your Leaves</h2>
              <p>3 used / 12 remaining</p>
            </div>
            <div className={styles.card}>
              <h2>📝 Performance</h2>
              <p>Q1 rating: 8.2 ⭐</p>
            </div>
            <div className={styles.card}>
              <h2>📂 Payslips</h2>
              <p>Last generated: March 2025</p>
            </div>
          </>
        )}
      </section>

      <section className={styles.announcements}>
        <h2>📢 Announcements</h2>
        <ul>
          <li>🔔 Mid-year reviews start next week</li>
          <li>🚨 New WFH policy from May 1st</li>
          <li>🎉 Employee Appreciation Day on Friday</li>
        </ul>
      </section>
    </main>
  );
}
