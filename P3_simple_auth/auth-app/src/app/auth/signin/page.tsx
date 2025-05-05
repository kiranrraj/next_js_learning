// auth/SignIn.tsx

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import InputField from '../../components/InputField'
import ErrorMessage from '../../components/ErrorMessage'
import styles from './SignIn.module.css'

const SignIn = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Simulate checking username and password (replace with real validation later)
    if (username === 'test' && password === 'password') {
      // Store the username in localStorage for this session
      localStorage.setItem('username', username)
      router.push('/auth/otp')  // Redirect to OTP page after successful sign-in
    } else {
      setError('Invalid username or password')
    }
  }

  return (
    <div className={styles["signin-portlet"]}>
      <h1 className={styles.welcome}>Welcome Back!</h1>
      <form onSubmit={handleSubmit} className='signin'>
        <InputField
          id="username"
          label="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <InputField
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <ErrorMessage message={error} />}
        <button type="submit">Next</button>
      </form>
    </div>
  )
}

export default SignIn
