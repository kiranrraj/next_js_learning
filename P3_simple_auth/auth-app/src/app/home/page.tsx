// home/Home.tsx

'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const Home = () => {
  const router = useRouter()

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'

    if (!isAuthenticated) {
      router.push('/auth/signin') 
    }
  }, [router])

  return (
    <div className="home-page">
      <h1>Welcome to Your Dashboard!</h1>
      <p>You are successfully signed in and authenticated.</p>
      <button onClick={() => {
        localStorage.removeItem('isAuthenticated')
        localStorage.removeItem('username')
        router.push('/auth/signin')
      }}>Sign Out</button>
    </div>
  )
}

export default Home
