import prisma from "../utils/db";
import bcrypt from "bcrypt";

async function main() {
  const hashedPassword = await bcrypt.hash("123456789", 10);

  await prisma.user.create({
    data: {
      email: "Admin1234@gmail.com",
      name: "AdminUser",
      username: "AdminUsername",
      password: hashedPassword,
      role: "admin",
    },
  });
  
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
