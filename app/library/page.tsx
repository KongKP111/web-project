"use client";

import { useEffect, useState } from "react";

export default function LibraryPage() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    username: "",
    password: "",
    previousPurchases: [] as string[], // Example, replace with actual data
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedEmail = localStorage.getItem("email");
      const savedUsername = localStorage.getItem("username");
      const savedPassword = localStorage.getItem("password");

      if (savedEmail && savedUsername && savedPassword) {
        setUserInfo({
          email: savedEmail,
          username: savedUsername,
          password: savedPassword,
          previousPurchases: ["Game 1", "Game 2", "Game 3"], // Mock data, replace with actual purchases
        });
      }
    }
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">My Library</h1>
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Account Info</h2>
        <p><strong>Email:</strong> {userInfo.email}</p>
        <p><strong>Username:</strong> {userInfo.username}</p>
        <p><strong>Password:</strong> {userInfo.password}</p>

        <h3 className="mt-6 text-xl font-semibold text-gray-800 mb-4">Previous Purchases</h3>
        <ul>
          {userInfo.previousPurchases.map((game, index) => (
            <li key={index} className="text-lg text-gray-600">{game}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}
