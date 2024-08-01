import { ObjectId, Db, Document } from "mongodb";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import createSecretToken from "../tokenGeneration";
import jwt from "jsonwebtoken";

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

declare global {
  namespace Express {
    interface Request {
      userId?: string | undefined;
    }
  }
}

export default function authController(db: Db) {
  return {
    logout: async (req: Request, res: Response) => {
      res.clearCookie("token");
      console.log("user logged out");
      res.json({ message: "Logged out" });
    },

    // make it try catch?
    login: async (req: Request, res: Response) => {
      const collection = db.collection("users");
      const { userNameOrEmail, passWord, rememberMe } = req.body;
      if (!(userNameOrEmail && passWord)) {
        return res.status(400).json({ message: "All inputs are required" });
      }

      const user = (await collection.findOne({
        $or: [
          { "credentials.email": userNameOrEmail },
          { username: userNameOrEmail },
        ],
      })) as UserProfile;

      if (!(user && (await bcrypt.compare(passWord, user.password)))) {
        console.log(
          `User tried to login with invalid credentials: Username/Email: ${userNameOrEmail}`,
        );
        return res.status(404).json({ message: "Invalid credentials" });
      }

      const token = createSecretToken(user._id);

      res.cookie("token", token, {
        // domain: process.env.FRONTEND_URL,
        path: "/",
        expires: rememberMe ? new Date(Date.now() + 86400000) : undefined,
        secure: false,
        httpOnly: false,
        sameSite: "lax",
      });

      console.log(`User Succesfully logged in: ${userNameOrEmail}`);

      return res.status(200).json({
        message: "User logged in successfully",
        token: token,
      });
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
          console.log(
            `User tried to signup with an email that is already in use: ${email}`,
          );
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
          console.log(`New user created: ${username}`);

          // Create a category document for the new user with the default categories of personal and business

          const newPersonalCategory = {
            name: "personal",
            color: "#1754bd",
            userId: result.insertedId,
          };

          const newBusinessCategory = {
            name: "business",
            color: "#ea06fe",
            userId: result.insertedId,
          };

          await db
            .collection("categories")
            .insertMany([newPersonalCategory, newBusinessCategory]);

          const token = createSecretToken(newUser._id);

          console.log(
            `New user created: ${username} with associated default categories collection`,
          );

          res.cookie("token", token, {
            path: "/", // Cookie is accessible from all paths
            // expires: rememberMe ? new Date(Date.now() + 86400000) : undefined,
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
        console.log("Something went wrong in authcontroller/signup");
        res.status(500).json({ message: e.message });
      }
    },

    authenticateToken: async (
      req: Request,
      res: Response,
      next: NextFunction,
    ) => {
      const cookieToken = req.cookies["token"];

      if (!cookieToken) {
        console.log("no token");
        return res.sendStatus(401);
      }

      if (!process.env.TOKEN_KEY) return;

      const collection = db.collection("users");

      jwt.verify(
        cookieToken,
        process.env.TOKEN_KEY as string,
        {},
        async (err: jwt.VerifyErrors | null, decoded: any) => {
          if (err) {
            return res.sendStatus(403);
          }

          const user = await collection.findOne({
            _id: ObjectId.createFromHexString(decoded.id),
          });

          if (!user) {
            return res.sendStatus(403);
          }

          // Set the userId on the request object
          req.userId = decoded.id;

          next();
        },
      );
    },
    checkUserLoggedIn: async (req: Request, res: Response) => {
      const cookieToken = req.cookies["token"];

      const collection = db.collection("users");

      if (!cookieToken) {
        return res.json({ loggedIn: false });
      }

      if (!process.env.TOKEN_KEY) return;

      jwt.verify(
        cookieToken,
        process.env.TOKEN_KEY,
        async (err: jwt.VerifyErrors | null, decoded: any) => {
          if (err) {
            return res.json({ loggedIn: false });
          }

          const user = await collection.findOne({
            _id: ObjectId.createFromHexString(decoded.id),
          });

          if (!user) {
            return res.sendStatus(403);
          }

          console.log("User loginCheck");
          return res.json({ loggedIn: true, userId: decoded.id });
        },
      );
    },
  };
}
