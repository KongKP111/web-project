// app/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mock login validation (Replace with actual API calls)
    if (email === 'Admin1234@gmail.com' && password === '123456789') {
      router.push('/blog'); // Redirect to blog for Admin
    } else {
      router.push('/blog-ui'); // Redirect to blog-ui for Customers
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-900 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-800 via-blue-600 to-blue-400 opacity-60 z-0"></div>
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-700 opacity-30 rounded-full filter blur-3xl z-0"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-600 opacity-30 rounded-full filter blur-3xl z-0"></div>

      {/* Main Content */}
      <div className="flex flex-row items-center justify-center w-full max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden z-10">
        {/* Left Section: Image */}
        <div className="flex-1 bg-gray-200">
          <img
            src="https://image.api.playstation.com/vulcan/ap/rnd/202405/2213/caf3b629a8afbc72a94ec15a568a898ac1845231398d77ac.png"
            alt="Game Image"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Section: Login Form */}
        <div className="flex-1 p-8">
          <h2 className="text-3xl font-bold text-center mb-6 text-blue-900">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Login
            </button>
          </form>
          <div className="text-center mt-4">
            <p className="text-gray-700">Don't have an account?</p>
            <button
              onClick={() => router.push('./blog/register')}
              className="text-blue-600 font-semibold hover:underline"
            >
              Register Here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
