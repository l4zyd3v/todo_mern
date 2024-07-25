import { ObjectId, Db } from "mongodb";
import { Request, Response } from "express";
// import bcrypt from "bcrypt";
// import createSecretToken from "../tokenGeneration";

type CategoryType = {
  _id?: ObjectId;
  name: string;
  color: string;
  userId: ObjectId;
};

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

    createCategory: async (req: Request, res: Response) => {
      const collection = db.collection("categories");
      const { userId } = req;
      const { name, color } = req.body;

      console.log("!!!!!!!!!!!!!!!!1 userId", userId);

      if (!name)
        return res.status(400).json({
          message: "Please Fill out a category name in the input field",
        });

      if (!userId) {
        return res.status(400).json({
          message: "User ID is not provided",
        });
      }

      try {
        const categoryAlreadyExist = await collection.findOne({
          name: name,
        });

        if (categoryAlreadyExist) {
          return res.status(409).json({
            message: "Category already exist",
          });
        } else {
          const newCategory: CategoryType = {
            name: name,
            color: color,
            userId: new ObjectId(userId),
          };
          const result = await collection.insertOne(newCategory);
          newCategory._id = result.insertedId;
          return res.status(201).json(newCategory);
        }
      } catch (e: any) {
        res.status(500).json({ message: e.message });
      }
    },
  };
}
