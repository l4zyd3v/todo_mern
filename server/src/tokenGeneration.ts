import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { config as configEnv } from "dotenv";

configEnv();

export default function createSecretToken(id: ObjectId | undefined) {
  const tokenKey = process.env.TOKEN_KEY;
  if (!tokenKey) {
    throw new Error("TOKEN_KEY is not set in the environment variables");
  }
  return jwt.sign({ id }, tokenKey, {
    expiresIn: 86400, // 24 hours
  });
}
