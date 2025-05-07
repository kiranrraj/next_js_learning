// frontend/src/app/auth/signup.tsx

import React, { useState } from "react";
import { useRouter } from "next/router";

const SignUp: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("user");
  const [accessiblePortlets, setAccessiblePortlets] = useState<string[]>(
    []
  );
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!username || !password) {
      setError("Please fill all the fields.");
      return;
    }

    // Send signup request (replace with actual API call)
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          role,
          accessible_portlets: accessiblePortlets,
        }),
      });

      if (response.ok) {
        router.push("/auth/signin");
      } else {
        setError("Error during signup. Please try again.");
      }
    } catch (error) {
      setError(`An error occurred. Please try again later. ${error}`);
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Role:</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="doctor">Doctor</option>
          </select>
        </div>
        <div>
          <label>Accessible Portlets:</label>
          <input
            type="text"
            value={accessiblePortlets.join(",")}
            onChange={(e) =>
              setAccessiblePortlets(e.target.value.split(","))
            }
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Sign Up</button>
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

export default SignUp;
