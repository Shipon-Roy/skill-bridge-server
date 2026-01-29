import { TutorProfile } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createTutor = async (
  data: Omit<TutorProfile, "id" | "createAt" | "updatedAt" | "userId">,
  userId: string,
) => {
  const result = await prisma.tutorProfile.create({
    data: { ...data, userId: userId },
  });

  return result;
};

export const tutorSerive = {
  createTutor,
};
