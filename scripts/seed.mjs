import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

const users = [
  {
    name: "Admin LMS",
    email: "admin@lms.local",
    password: "password123",
    role: "admin",
  },
  {
    name: "Pak Budi Santoso",
    email: "teacher@lms.local",
    password: "password123",
    role: "teacher",
  },
  {
    name: "Andi Wijaya",
    email: "student@lms.local",
    password: "password123",
    role: "student",
  },
];

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL belum diset. Pastikan env sudah benar.");
  }

  for (const user of users) {
    const hashedPassword = await hash(user.password, 10);

    const upserted = await prisma.user.upsert({
      where: { email: user.email },
      update: {
        name: user.name,
        password: hashedPassword,
        role: user.role,
      },
      create: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
        role: user.role,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    console.log(`[${upserted.role.toUpperCase()}] ${upserted.name} <${upserted.email}> — ready`);
  }

  console.log("\nSemua akun demo siap.");
  console.log("Login di /login dengan email & password di atas.");
}

main()
  .catch((error) => {
    console.error("Gagal seed akun demo:", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
