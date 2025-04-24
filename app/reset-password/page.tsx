'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import styles from './reset-password.module.css';

const ResetPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  // Extract email & token from the URL on page load
  useEffect(() => {
    const emailFromURL = searchParams.get('email');
    const tokenFromURL = searchParams.get('token');

    if (emailFromURL && tokenFromURL) {
      setEmail(emailFromURL);
      setToken(tokenFromURL);
    } else {
      setError('Invalid or expired password reset link.');
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/reset-password', {
        email,
        token,
        newPassword: password,
      });

      if (res.status === 200) {
        alert('✅ Password reset successful!');
        router.push('/login');
      }
    } catch (err) {
      setError(err?.response?.data?.message || 'Reset failed. Try again.');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Reset Your Password</h1>
      {error && <p className={styles.error}>{error}</p>}
      <form className={styles.resetPasswordForm} onSubmit={handleSubmit}>
        <input
          required
          className={styles.input}
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          required
          className={styles.input}
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit" className={styles.resetButton}>
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
