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

      try {
        const collection = db.collection("categories");

        const userCategories = await collection
          .find({ userId: new ObjectId(userId) })
          .toArray();

        console.log("User requested all categories");
        return res.status(200).json(userCategories);
      } catch (error: any) {
        console.log(
          "Something went wrong in categoryController/getAllCategories",
        );
        res.status(500).json({ message: error.message });
      }
    },

    createCategory: async (req: Request, res: Response) => {
      const collection = db.collection("categories");
      const { userId } = req;
      const { name, color } = req.body;

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
          console.log("User tried to create a category that already exist");
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
          console.log("User created a new category");
          return res.status(201).json(newCategory);
        }
      } catch (e: any) {
        console.log(
          "Something went wrong in categoryController/createCategory",
        );
        res.status(500).json({ message: e.message });
      }
    },
  };
}
