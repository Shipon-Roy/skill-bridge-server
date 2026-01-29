import { NextFunction, Request, Response } from "express";
import { auth as betterAuth } from "../lib/auth";

export enum Role {
  STUDENT = "STUDENT",
  TUTOR = "TUTOR",
  ADMIN = "ADMIN",
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        name: string;
        email: string;
        role: string;
        emailVerified: boolean;
      };
    }
  }
}

const auth = (...roles: Role[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.headers);

      const session = await betterAuth.api.getSession({
        headers: req.headers as any,
      });
      console.log(session);
      if (!session) {
        return res.status(401).json({
          success: false,
          message: "You are not authorized!",
        });
      }

      if (!session?.user.emailVerified) {
        return res.status(403).json({
          success: false,
          message: "Email veryfication requred. Please verify your email!",
        });
      }

      req.user = {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        role: session.user.role,
        emailVerified: session.user.emailVerified,
      };

      if (roles.length && !roles.includes(req.user.role as Role)) {
        return res.status(403).json({
          success: false,
          message:
            "Fobbiden! You don't have permission to access this resourse!",
        });
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};

export default auth;
