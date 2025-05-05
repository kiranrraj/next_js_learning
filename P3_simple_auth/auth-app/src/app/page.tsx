// app/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/auth/signin'); // Redirect to the sign-in page
  }, [router]);

  return <div>Redirecting...</div>;
}
