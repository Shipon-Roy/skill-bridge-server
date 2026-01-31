import { Request } from "express";
import { auth } from "../../lib/auth";

const register = async (data: any) => {
  return auth.api.signUpEmail(data);
};

const login = async (data: any) => {
  return auth.api.signInEmail(data);
};

const me = async (req: Request) => {
  const session = await auth.api.getSession({
    headers: req.headers as any,
  });

  if (!session) {
    throw new Error("Unauthorized!");
  }

  return session.user;
};

export const authService = {
  register,
  login,
  me,
};
