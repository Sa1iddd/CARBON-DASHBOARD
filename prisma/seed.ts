// prisma/seed.ts
import { PrismaClient, Gender } from '../src/generated/prisma';
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seeding...");

  // ==============================
  // 1. Seed Admin User
  // ==============================
  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      passwordHash: 'hashedpassword', // TODO: ganti bcrypt nanti
      name: 'Admin',
      role: 'ADMIN',
    },
  });

  // ==============================
  // 2. Seed Dorm Master Data
  // ==============================
  const dorms = [
    {
      name: "Limo",
      gender: Gender.PUTRI,
      capacity: 27,
      powerCapacity: 5500,
    },
    {
      name: "Kebon Nanas",
      gender: Gender.PUTRA,
      capacity: 14,
      powerCapacity: 3200,
    },
    {
      name: "An Nur",
      gender: Gender.PUTRI,
      capacity: 20,
      powerCapacity: 5500,
    },
    {
      name: "H. Soleh I",
      gender: Gender.PUTRI,
      capacity: 34,
      powerCapacity: 2200,
    },
    {
      name: "Sasak II",
      gender: Gender.PUTRA,
      capacity: 24,
      powerCapacity: 1300,
    },
    {
      name: "Sasak III",
      gender: Gender.PUTRA,
      capacity: 24,
      powerCapacity: 2200,
    }
  ];

  for (const dorm of dorms) {
    await prisma.dorm.upsert({
      where: { name: dorm.name },
      update: {},
      create: dorm,
    });
  }

  console.log("🌱 Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
