import { Router } from "express";
import { Db, ObjectId } from "mongodb";
// import { body, validationResult } from "express-validator";

import userController from "../controllers/userController";

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

export function userRoutes(db: Db) {
  const controller = userController(db);
  const router = Router();

  router.post("/signup", controller.signup);

  return router;
}
