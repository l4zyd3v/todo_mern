import { Router } from "express";
import { Db, ObjectId } from "mongodb";
// import { body, validationResult } from "express-validator";

import authController from "../controllers/authController";

type Inputs = {
  username: string;
  password: string;
  email: string;
  firstname: string;
  lastname: string;
};

type UserProfile = {
  _id?: ObjectId;
  username: string;
  password: string;
  profilePicture?: string;
  credentials: {
    firstName: string;
    lastName: string;
    email: string;
  };
};

export function authRoutes(db: Db) {
  const controller = authController(db);
  const router = Router();

  router.post("/signup", controller.signup);
  router.post("/login", controller.login);
  router.post("/logout", controller.logout);

  // mabe also add this? :
  // router.post("/refresh-token", controller.refreshToken);

  return router;
}
