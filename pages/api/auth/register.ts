import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import prisma from "../../../utils/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, username, password, name } = req.body; // เพิ่ม name

    if (!email || !username || !password || !name) {  // ตรวจสอบ name
      return res.status(400).json({ message: "All fields are required." });
    }

    try {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return res.status(400).json({ message: "Email already in use." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await prisma.user.create({
        data: {
          email,
          username,
          password: hashedPassword,
          name,  // ส่ง name ไปด้วย
        },
      });

      // Save the user data in localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("email", email);
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);  // Save password (not recommended for security reasons)
      }

      return res.status(201).json({ message: "User registered successfully." });
    } catch (error) {
      console.error("Error during registration:", error);
      return res.status(500).json({ message: "Internal server error." });
    }
  }

  return res.status(405).json({ message: "Method not allowed." });
}
