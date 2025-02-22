import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create Users
  await prisma.user.createMany({
    data: [
      { username: "admin", password_hash: "hashedpassword1", role: "Admin" },
      { username: "manager", password_hash: "hashedpassword2", role: "Manager" },
      { username: "staff", password_hash: "hashedpassword3", role: "Booking_Staff" }
    ]
  });

  // Create Cinemas
  await prisma.cinema.create({
    data: { city: "London", location: "Central Mall", screen_count: 3 }
  });

  console.log("✅ Seeding completed!");
}

main()
  .catch((error) => {
    console.error("❌ Error seeding database:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });