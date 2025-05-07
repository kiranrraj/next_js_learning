'use client';

import React, { useState } from 'react';
import styles from './page.module.css';

const SignUpPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Form submission started');
    console.log('Entered username:', username);
    console.log('Entered password:', password);
    console.log('Entered confirm password:', confirmPassword);

    if (password !== confirmPassword) {
      console.error('Passwords do not match');
      setError('Passwords do not match');
      return;
    }

    console.log('Passwords match, sending request...');
    try {
      const requestBody = {
        username,
        password,
        role: 'doctor',
        accessible_portlets: ['patients', 'testSites'],
      };
      console.log('Request body:', requestBody);

      const response = await fetch('http://localhost:8000/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const err = await response.json();
        console.error('Error response:', err);
        throw new Error(err.detail || 'Sign up failed');
      }

      const data = await response.json();
      console.log('Signup success:', data);

      setSuccess('User created successfully!');
      setUsername('');
      setPassword('');
      setConfirmPassword('');
      setError('');
    } catch (err: any) {
      console.error('Error during signup request:', err);
      setError(err.message);
      setSuccess('');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Sign Up</h2>
      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            className={styles.input}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            className={styles.input}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            className={styles.input}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button className={styles.btn} type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpPage;
