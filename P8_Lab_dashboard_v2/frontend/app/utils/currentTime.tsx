// app/components/CurrentTime.tsx
'use client';

import { useEffect, useState } from 'react';

export default function CurrentTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString());
    update(); // initial set
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!time) return null; // avoid rendering mismatched HTML

  return <span>{time}</span>;
}
