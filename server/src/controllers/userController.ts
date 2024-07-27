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
  return {
    getSingleUser: async (req: Request, res: Response) => {
      const { userId } = req;

      try {
        const collection = db.collection("users");

        const singleUser = await collection
          .find({ _id: new ObjectId(userId) })
          .toArray();

        console.log("User requested single user");
        return res.status(200).json(singleUser);
      } catch (error: any) {
        console.log("Something went wrong in userController/getSingleUser");
        res.status(500).json({ message: error.message });
      }
    },
  };
}
