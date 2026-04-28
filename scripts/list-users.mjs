import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL belum diset. Pastikan env sudah benar.");
  }

  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
    orderBy: { createdAt: "asc" },
  });

  if (users.length === 0) {
    console.log("Tidak ada user di database.");
    return;
  }

  console.log(`\nDitemukan ${users.length} user:\n`);
  users.forEach((u, i) => {
    console.log(`${i + 1}. [${u.role.toUpperCase()}] ${u.name}`);
    console.log(`   Email: ${u.email}`);
    console.log(`   Dibuat: ${u.createdAt.toISOString()}`);
    console.log("");
  });
}

main()
  .catch((error) => {
    console.error("Gagal mengambil user:", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
