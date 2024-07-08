import { Router } from "express";
import { Db, ObjectId } from "mongodb";
// import { body, validationResult } from "express-validator";
import authController from "../controllers/authController";

import userController from "../controllers/userController";

type Inputs = {
  username: string;
  password: string;
  email: string;
  firstname: string;
  lastname: string;
};

export function userRoutes(db: Db) {
  const controller = userController(db);
  const authControl = authController(db);
  const router = Router();

  router.get("/users", authControl.authenticateToken, controller.getSingleUser);

  return router;
}
