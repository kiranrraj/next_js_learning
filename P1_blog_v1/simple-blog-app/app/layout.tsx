// app/layout.tsx
export const metadata = {
    title: 'My Blog',
    description: 'A simple blog built with Next.js',
  };
  
  export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
      <html lang="en">
        <body>{children}</body>
      </html>
    );
  }
  