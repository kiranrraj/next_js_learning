// frontend/src/app/loading.tsx

import React, { useEffect } from "react";
import { useRouter } from "next/router";

const Loading: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    // Simulate a loading process and redirect after 3 seconds
    setTimeout(() => {
      router.push("/auth/signin"); // or "/auth/signup" depending on your flow
    }, 3000);
  }, [router]);

  return (
    <div className="loading-container">
      <div className="loading-animation"></div>
      <style jsx>{`
        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f0f0f0;
        }
        .loading-animation {
          width: 50px;
          height: 50px;
          border: 5px solid #ccc;
          border-top: 5px solid #0070f3;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Loading;
