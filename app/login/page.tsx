'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import styles from './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      const token = response.data.token;

      if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', token); // ✅ Use "accessToken" to match AuthContext
        console.log('[Login] Token stored in localStorage:', token);
      }

      alert('Logged in successfully');
      router.push('/dashboard'); // Redirect after storing token
    } catch (error) {
      console.error('[Login] Login error:', error);
      setError('Check Email and Password');
    }
  };

  const handleSignup = () => {
    router.push('/register');
  };

  return (
    <div className={styles.container}>
      <div className={styles.heading}>Sign In</div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          required
          className={styles.input}
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          required
          className={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span className={styles.forgotPassword}>
          <a href="/forgot-password">Forgot Password?</a>
        </span>
        {error && <p className={styles.error}>{error}</p>}
        <input className={styles.loginButton} type="submit" value="Sign In" />
      </form>
      <span className={styles.title}>Don't have an account?</span>
      <input
        className={styles.signupButton}
        type="button"
        value="Sign up"
        onClick={handleSignup}
      />
    </div>
  );
};

export default Login;
