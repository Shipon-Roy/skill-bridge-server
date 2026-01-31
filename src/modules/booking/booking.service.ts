import { BookingStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

const createBooking = async (studentId: string, tutorId: string) => {
  return await prisma.booking.create({
    data: {
      studentId,
      tutorId,
      status: BookingStatus.UPCOMING,
    },
  });
};

const getMyBookings = async (studentId: string) => {
  return await prisma.booking.findMany({
    where: { studentId },
    include: {
      tutor: {
        include: {
          user: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getBookingById = async (bookingId: string, studentId: string) => {
  return await prisma.booking.findFirst({
    where: {
      id: bookingId,
      studentId,
    },
    include: {
      tutor: {
        include: {
          user: true,
        },
      },
      student: true,
    },
  });
};

const getAllTutors = async () => {
  return await prisma.tutorProfile.findMany({
    select: {
      userId: true,
      id: true,
      bio: true,
      pricePerHr: true,
      rating: true,
      user: {
        select: {
          name: true,
          email: true,
          image: true,
        },
      },
    },
  });
};

export const bookingService = {
  createBooking,
  getMyBookings,
  getBookingById,
  getAllTutors,
};
