import express from "express";
import { Router } from "express";
import { Db, ObjectId } from "mongodb";
import { body, validationResult } from "express-validator";

type Inputs = {
  username: string;
  password: string;
  email: string;
  firstname: string;
  lastname: string;
};

type UserProfile = {
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
  router.post("/", async (req, res) => {
    const { email, username, firstname, lastname, password } = req.body;

    console.log(email);
    console.log(username);

    try {
      const userExists = await collection.findOne({
        "credentials.email": email,
      });

      if (userExists) {
        res
          .status(409)
          .json({ message: "The email is already in use by a user" });
      } else {
        const newUser: UserProfile = {
          username: username,
          password: password,
          credentials: {
            firstName: firstname,
            lastName: lastname,
            email: email,
          },
        };
        await collection.insertOne(newUser);
        res.status(201).json({
          message: "User created successfully",
        });
      }
    } catch (e: any) {
      res.status(500).json({ message: e.message });
    }

    console.log("Hello from Obi-Wan Kenobi");
  });

  return router;
}
