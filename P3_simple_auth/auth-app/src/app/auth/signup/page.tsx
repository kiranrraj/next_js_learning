'use client';

import { useState } from 'react';
import InputField from '../../components/InputField';  // Adjust path if needed
import styles from './SignUp.module.css';   // Correctly imported CSS module

const SignupPortlet = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    console.log({ username, password });
    setUsername('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className={styles.signupPortlet}>
      <h2 className={styles.title}>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <InputField
          id="username"
          label="User Name"
          type="text"
          value={username}
          labelClassName={styles.label}
          inputClassName={styles.input}
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputField
          id="password"
          label="Password"
          type="password"
          value={password}
          labelClassName={styles.label}
          inputClassName={styles.input}
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputField
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          labelClassName={styles.label}
          inputClassName={styles.input}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" className={styles.submitButton}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupPortlet;
