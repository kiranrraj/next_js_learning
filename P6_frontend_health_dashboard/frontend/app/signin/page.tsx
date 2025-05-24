'use client';
import styles from "./Signin.module.css"
import { useState } from 'react';

export default function SignInPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleClear = () => {
    setUsername('');
    setPassword('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <div className={styles.container}>
      <div className={styles.portlet}>
        <h2 className={styles.title}>🔐 Sign In</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>
            Username:
            <input
              className={styles.input}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <label>
            Password:
            <input
              className={styles.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <div className={styles.buttons}>
            <button className={styles.button} type="submit">Submit</button>
            <button className={styles.button} type="button" onClick={handleClear}>Clear</button>
          </div>
        </form>
      </div>
    </div>
  );
}