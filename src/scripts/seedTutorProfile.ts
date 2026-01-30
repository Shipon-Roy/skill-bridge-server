import { prisma } from "../../src/lib/prisma";

async function main() {
  // categories

  const math = await prisma.category.create({
    data: {
      name: "Typescript",
    },
  });

  const physics = await prisma.category.create({
    data: {
      name: "Prisma",
    },
  });

  const english = await prisma.category.create({
    data: {
      name: "Nextjs",
    },
  });

  // users

  const tutorUser = await prisma.user.create({
    data: {
      id: "tutor-user-1",
      name: "Md. Farhan",
      email: "farhan@test.com",
      role: "TUTOR",
    },
  });

  const studentUser = await prisma.user.create({
    data: {
      id: "student-user-1",
      name: "MR Shipon",
      email: "shipon@test.com",
      role: "STUDENT",
    },
  });

  // tutor profile

  await prisma.tutorProfile.create({
    data: {
      userId: tutorUser.id,
      bio: "Experienced Typescript and Next tutor with 5+ years experience.",
      pricePerHr: 800,
      rating: 4.7,
      categories: {
        connect: [{ id: math.id }, { id: physics.id }],
      },
    },
  });

  console.log("Tutor Profile added");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
