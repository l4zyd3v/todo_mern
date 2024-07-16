import { ObjectId, Db } from "mongodb";
import { Request, Response } from "express";
// import bcrypt from "bcrypt";
// import createSecretToken from "../tokenGeneration";

export default function categoryController(db: Db) {
  return {
    getAllCategories: async (req: Request, res: Response) => {
      const { userId } = req;

      console.log("hello from categoryController.ts");

      console.log("userId: ", userId);

      try {
        const collection = db.collection("categories");

        const userCategories = await collection
          .find({ userId: new ObjectId(userId) })
          .toArray();

        console.log("User requested all categories");
        return res.status(200).json(userCategories);
      } catch (error: any) {
        console.log("oops something wrong daiiim");
        res.status(500).json({ message: error.message });
      }
    },
  };
}
