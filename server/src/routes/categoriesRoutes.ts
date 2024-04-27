import { Router } from "express";
import { Db, ObjectId } from "mongodb";

import { body, validationResult } from "express-validator";

export function categoriesRoutes(db: Db) {
  const router = Router();
  const collection = db.collection("categories");

  // Fetch all categories
  router.get("/", async (req, res) => {
    try {
      const categories = await collection.find({}).toArray();
      res.json(categories);
      console.log("User requested all categories");
    } catch (e: any) {
      res.status(500).json({ message: e.message });
    }
  });

  // Fetch a category todo by ID
  router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
      const category = await collection.findOne({ _id: new ObjectId(id) });
      if (category) {
        res.json(category);
        console.log("User requested a single category by ID");
      } else {
        res.status(404).json({ message: "Category not found" });
      }
    } catch (e: any) {
      res.status(500).json({ message: e.message });
    }
  });

  return router;
}
