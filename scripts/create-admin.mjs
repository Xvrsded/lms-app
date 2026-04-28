import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

const adminName = process.env.ADMIN_NAME?.trim() || "Admin LMS";
const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase() || "admin@lms.local";
const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL belum diset. Pastikan env sudah benar.");
  }

  if (adminPassword.length < 6) {
    throw new Error("ADMIN_PASSWORD minimal 6 karakter.");
  }

  const hashedPassword = await hash(adminPassword, 10);

  const user = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      name: adminName,
      password: hashedPassword,
      role: "admin",
    },
    create: {
      name: adminName,
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });

  console.log("Akun admin siap:");
  console.log(`- id: ${user.id}`);
  console.log(`- name: ${user.name}`);
  console.log(`- email: ${user.email}`);
  console.log(`- role: ${user.role}`);
}

main()
  .catch((error) => {
    console.error("Gagal membuat akun admin:", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
