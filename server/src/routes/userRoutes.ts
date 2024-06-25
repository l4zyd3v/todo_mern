import { Router } from "express";
import { Db, ObjectId } from "mongodb";
// import { body, validationResult } from "express-validator";

import bcrypt from "bcrypt";
import createSecretToken from "../tokenGeneration";

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
  const router = Router();
  const collection = db.collection("users");

  // Signup
  router.post("/signup", async (req, res) => {
    const { email, username, firstname, lastname, password } = req.body;

    try {
      if (!email || !username || !firstname || !lastname || !password) {
        return res.status(400).json({ message: "Please fill out all fields" });
      }

      const salt = 10;
      const hashedPassword = await bcrypt.hash(password, salt);

      const userExists = await collection.findOne({
        "credentials.email": email,
      });

      if (userExists) {
        return res
          .status(409)
          .json({ message: "The email is already in use by a user" });
      } else {
        const newUser: UserProfile = {
          username: username,
          password: hashedPassword,
          credentials: {
            firstName: firstname,
            lastName: lastname,
            email: email,
          },
        };
        const result = await collection.insertOne(newUser);
        newUser._id = result.insertedId;

        const token = createSecretToken(newUser._id);

        console.log(`New user created: ${username}`);

        res.cookie("token", token, {
          path: "/", // Cookie is accessible from all paths
          expires: new Date(Date.now() + 86400000), // Cookie expires in 1 day
          secure: false,
          httpOnly: false,
          sameSite: "lax",
        });

        return res.status(201).json({
          message: "User created successfully",
          // token: token,
        });
      }
    } catch (e: any) {
      return res.status(500).json({ message: e.message });
    }
  });

  return router;
}
