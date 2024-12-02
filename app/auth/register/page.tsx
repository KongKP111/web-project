"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    try {
      console.log("Sending data:", { email, username, password });
  
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password }),
      });
  
      if (!res.ok) {
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const error = await res.json();
          console.error("Registration failed:", error.message);
          alert(`Registration failed: ${error.message}`);
        } else if (res.status === 404) {
          console.error("API not found");
          alert("Registration failed: API not found.");
        } else {
          const errorText = await res.text();
          console.error("Registration failed:", errorText);
          alert("Registration failed. Please check the server logs.");
        }
        return;
      }
  
      alert("Registration successful!");
      router.push("/auth/login");
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An unexpected error occurred.");
    }  
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 bg-white shadow-md rounded-md">
        <h1 className="text-2xl mb-4">Register</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <button
          onClick={handleRegister}
          className="w-full bg-green-500 text-white py-2 rounded"
        >
          Register
        </button>
      </div>
    </main>
  );
}
