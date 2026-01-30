import { prisma } from "../../lib/prisma";

const createProfile = async (userId: string, data: any) => {
  // Check user exists
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Prevent duplicate tutor profile
  const existingProfile = await prisma.tutorProfile.findUnique({
    where: { userId },
  });

  if (existingProfile) {
    throw new Error("Tutor profile already exists");
  }

  // Validate categories
  if (!data.categoryIds || data.categoryIds.length === 0) {
    throw new Error("At least one category is required");
  }

  const categories = await prisma.category.findMany({
    where: {
      id: { in: data.categoryIds },
    },
  });

  if (categories.length !== data.categoryIds.length) {
    throw new Error("One or more categories not found");
  }

  // Create tutor profile
  return prisma.tutorProfile.create({
    data: {
      userId,
      bio: data.bio,
      pricePerHr: Number(data.pricePerHr),
      categories: {
        connect: data.categoryIds.map((id: string) => ({ id })),
      },
    },
    include: {
      categories: true,
      user: true,
    },
  });
};

export const tutorService = {
  createProfile,
};
