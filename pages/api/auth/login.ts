import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import prisma from "../../../utils/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      const user = await prisma.user.findUnique({
        where: { email },
        select: { id: true, email: true, username: true, password: true, role: true },
      });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Invalid credentials." });
      }

      return res.status(200).json({
        email: user.email,
        username: user.username,
        role: user.role,
      });
      
    } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({ message: "Internal server error." });
    }
  }

  return res.status(405).json({ message: "Method not allowed." });
}
