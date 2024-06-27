import { ObjectId, Db, Document } from "mongodb";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import createSecretToken from "../tokenGeneration";

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

type ExpressParams = {
  req: Request;
  res: Response;
};

export default function authController(db: Db) {
  return {
    logout: async ({ req, res }: ExpressParams) => {
      res.clearCookie("token");
      res.json({ message: "Logged out" });
    },

    login: async ({ req, res }: ExpressParams) => {
      const collection = db.collection("users");
      const { userNameOrEmail, password } = req.body;

      if (!(userNameOrEmail && password)) {
        return res.status(400).json({ message: "All inputs are required" });
      }

      const user = await collection.findOne({
        $or: [
          { "credentials.email": userNameOrEmail },
          { username: userNameOrEmail },
        ],
      });

      console.log(user);

      if (!(user && (await bcrypt.compare(password, user.password)))) {
        return res.status(404).json({ message: "Invalid credentials" });
      }

      const token = createSecretToken(user._id);

      res.cookie("token", token, {
        domain: process.env.frontend_url,
        path: "/",
        expires: new Date(Date.now() + 86400000),
        secure: false,
        httpOnly: false,
        sameSite: "lax",
      });

      res.json({ token });
    },

    signup: async ({ req, res }: ExpressParams) => {
      const collection = db.collection("users");
      const { email, username, firstname, lastname, password } = req.body;

      try {
        if (!email || !username || !firstname || !lastname || !password) {
          return res
            .status(400)
            .json({ message: "Please fill out all fields" });
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
            token: token,
          });
        }
      } catch (e: any) {
        res.status(500).json({ message: e.message });
      }
    },
  };
}
