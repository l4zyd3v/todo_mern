import { ObjectId, Db, Document } from "mongodb";
import { Request, Response } from "express";

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

export default function usercontroller(db: Db) {
  return;
}
