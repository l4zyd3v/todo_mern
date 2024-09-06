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

    checkCategoryTasks: async (req: Request, res: Response) => {
      const { categoryId } = req.params;

      try {
        const tasks = await db
          .collection("tasks")
          .find({
            categoryId: new ObjectId(categoryId),
          })
          .toArray();

        if (tasks.length > 0) {
          res.status(200).json({ hasTasks: true });
        } else {
          res.status(200).json({ hasTasks: false });
        }
      } catch (e: any) {
        res.status(500).json({ message: e.message });
      }
    },

    deleteCategory: async (req: Request, res: Response) => {
      const { categoryId } = req.params;

      try {
        // Check if there are tasks associated with the category
        const tasks = await db
          .collection("tasks")
          .find({
            categoryId: new ObjectId(categoryId),
          })
          .toArray();

        // If there are tasks, delete them
        if (tasks.length > 0) {
          const taskDeletionResult = await db.collection("tasks").deleteMany({
            categoryId: new ObjectId(categoryId),
          });

          if (taskDeletionResult.deletedCount > 0) {
            res.status(200).json({
              message: "All tasks associated with category have been deleted",
            });
          }
        }

        // Proceed to delete the category
        const categoryDeletedResult = await db
          .collection("categories")
          .deleteOne({
            _id: new ObjectId(categoryId),
          });

        if (categoryDeletedResult.deletedCount === 1) {
          res.json({ message: "category deleted successfully" });
          console.log("User deleted a category");
        } else {
          res.status(404).json({ message: "Category not found" });
        }
      } catch (e: any) {
        res.status(500).json({ message: e.message });
      }
    },
  };
}
