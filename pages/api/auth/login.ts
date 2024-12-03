import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/db";
import bcrypt from "bcrypt";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    return res.status(200).json({ role: user.role });
  }
  return res.status(405).json({ message: "Method not allowed." });
}