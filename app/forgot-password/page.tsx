'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './forgot-password.module.css';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState(1);
  const [timer, setTimer] = useState(0);
  const [canResend, setCanResend] = useState(true);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      if (res.status === 200) {
        setStep(2);
        setTimer(120);
        setCanResend(false);
      }
    } catch (err) {
      setError('Mail does not exist!');
      alert('Check your Mail !!');
    }
  };

  const handleVerifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/verify-password', {
        email,
        code,
        newPassword,
        confirmPassword,
      });
      if (res.status === 200) {
        setSuccess(true);
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      }
    } catch (err) {
      setError('Failed to reset password');
    }
  };

  const handleResendCode = async () => {
    setError('');
    setSuccess(false);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      if (res.status === 200) {
        setTimer(120);
        setCanResend(false);
      }
    } catch {
      setError('Failed to resend verification code');
    }
  };

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  return (
    <div className={styles.container}>
      <h1>Forgot Password</h1>
      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>Password updated! Redirecting...</p>}
      {step === 1 && (
        <form className={styles.forgotPasswordForm} onSubmit={handleEmailSubmit}>
          <input
            required
            type="email"
            className={styles.input}
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className={styles.resetButton}>
            Send Verification Code
          </button>
        </form>
      )}
      {step === 2 && (
        <>
          <form className={styles.forgotPasswordForm} onSubmit={handleVerifySubmit}>
            <input
              required
              type="text"
              className={styles.input}
              placeholder="Enter verification code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <input
              required
              type="password"
              className={styles.input}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              required
              type="password"
              className={styles.input}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button type="submit" className={styles.resetButton}>
              Update Password
            </button>
          </form>
          <button onClick={handleResendCode} className={styles.resendButton} disabled={!canResend}>
            {canResend ? 'Resend Verification Code' : `Resend in ${timer}s`}
          </button>
        </>
      )}
    </div>
  );
};

export default ForgotPasswordPage;
