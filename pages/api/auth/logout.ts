// /pages/api/auth/logout.ts

import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

export default function logout(req: NextApiRequest, res: NextApiResponse) {
  // Clear the session cookie (adjust the cookie name to match your app's session cookie)
  res.setHeader('Set-Cookie', cookie.serialize('session_token', '', {
    maxAge: -1, // Expire the cookie
    path: '/',  // Set the path to root to remove the cookie globally
  }));

  // Respond with success
  res.status(200).json({ message: 'Logged out successfully' });
}
