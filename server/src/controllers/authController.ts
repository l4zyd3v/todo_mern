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

export default function authController(db: Db) {
  return {
    logout: async (req: Request, res: Response) => {
      res.clearCookie("token");
      res.json({ message: "Logged out" });
    },

    login: async (req: Request, res: Response) => {
      const collection = db.collection("users");
      console.log("user is trying to login");
      const { userNameOrEmail, passWord } = req.body;

      console.log("userNameOrEmail", userNameOrEmail, "passWord", passWord);

      if (!(userNameOrEmail && passWord)) {
        return res.status(400).json({ message: "All inputs are required" });
      }

      const user = await collection.findOne({
        $or: [
          { "credentials.email": userNameOrEmail },
          { username: userNameOrEmail },
        ],
      });

      //testing
      if (!user) return;
      console.log(await bcrypt.compare(passWord, user.password));
      //

      // the comparison is coming back as false, something isnt right
      if (!(user && (await bcrypt.compare(passWord, user.password)))) {
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

      res.status(200).json({ token });
    },

    signup: async (req: Request, res: Response) => {
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
