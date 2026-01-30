import { prisma } from "../../lib/prisma";

const getTutors = (filters: any) => {
  const where: any = {};

  if (filters?.price) {
    where.pricePerHr = {
      lte: Number(filters.price),
    };
  }

  if (filters?.rating) {
    where.rating = {
      gte: Number(filters.rating),
    };
  }

  if (filters?.category) {
    where.categories = {
      some: {
        name: filters.category,
      },
    };
  }

  return prisma.tutorProfile.findMany({
    where,
    include: {
      user: true,
      categories: true,
    },
  });
};

const createProfile = async (userId: string, data: any) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const existingProfile = await prisma.tutorProfile.findUnique({
    where: { userId },
  });

  if (existingProfile) {
    throw new Error("Tutor profile already exists");
  }

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

  return prisma.tutorProfile.create({
    data: {
      bio: data.bio,
      pricePerHr: Number(data.pricePerHr),
      user: {
        connect: {
          id: userId,
        },
      },
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
  getTutors,
  createProfile,
};
