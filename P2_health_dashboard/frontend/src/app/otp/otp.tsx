// frontend/src/app/auth/otp.tsx

import React, { useState } from "react";
import { useRouter } from "next/router";

const OTP: React.FC = () => {
  const [otp, setOtp] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otp) {
      setError("Please enter the OTP.");
      return;
    }

    // Send OTP verification request (replace with actual API call)
    try {
      const response = await fetch("/api/auth/otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp }),
      });

      if (response.ok) {
        router.push("/dashboard"); // Redirect to dashboard or another page
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (error) {
      setError(`An error occurred. Please try again later. ${error}`);
    }
  };

  return (
    <div className="auth-container">
      <h2>Enter OTP</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>OTP:</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Verify OTP</button>
      </form>
      <style jsx>{`
        .auth-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          max-width: 400px;
          margin: 0 auto;
          padding: 20px;
          background-color: #fff;
          border-radius: 8px;
        }
        form div {
          margin: 10px 0;
        }
        .error {
          color: red;
        }
      `}</style>
    </div>
  );
};

export default OTP;
