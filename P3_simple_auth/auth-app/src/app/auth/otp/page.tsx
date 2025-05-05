// auth/OTP.tsx

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ErrorMessage from '../../components/ErrorMessage'

const OTP = () => {
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (otp === '123456') {
      localStorage.setItem('isAuthenticated', 'true')
      router.push('/home') 
    } else {
      setError('Invalid OTP')
    }
  }

  return (
    <div className="otp-portlet">
      <h1>Enter OTP</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="otp">OTP</label>
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>
        {error && <ErrorMessage message={error} />}
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default OTP
