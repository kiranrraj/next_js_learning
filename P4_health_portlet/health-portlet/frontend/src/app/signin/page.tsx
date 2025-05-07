'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

const SignInPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      console.log('Sending request to backend...');
      const response = await fetch('http://localhost:8000/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      // Log response status and data
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        const data = await response.json();
        console.error('Error data:', data);
        throw new Error(data.detail || 'Login failed');
      }

      const data = await response.json();
      console.log('Login success:', data);

      // Store user data in localStorage or state management
      localStorage.setItem('userRole', data.role);
      localStorage.setItem('accessiblePortlets', JSON.stringify(data.accessible_portlets));

      setError('');
      router.push('/otp'); // navigate to OTP page or home page
    } catch (err: any) {
      console.error('Error during login request:', err);
      setError(err.message);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Sign In</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            className={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className={styles.btn} type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignInPage;
