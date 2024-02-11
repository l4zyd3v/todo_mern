import { Router } from "express";
import { Db, ObjectId } from "mongodb"; // import Db type for type checking
import { body, validationResult } from "express-validator";

export function todoRoutes(db: Db) {
  const router = Router();
  const collection = db.collection("todo");

  // Fetch all todos
  router.get("/", async (req, res) => {
    try {
      const todos = await collection.find({}).toArray();
      res.json(todos);
    } catch (e: any) {
      res.status(500).json({ message: e.message });
    }
  });

  // Fetch a single todo by ID
  router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
      const todo = await collection.findOne({ _id: new ObjectId(id) });
      if (todo) {
        res.json(todo);
      } else {
        res.status(404).json({ message: "Todo not found" });
      }
    } catch (e: any) {
      res.status(500).json({ message: e.message });
    }
  });

  // Create a todo
  router.post("/", async (req, res) => {
    try {
      const newTodo = req.body; // Assuming the body contains the todo structure
      const result = await collection.insertOne(newTodo);
      if (result.acknowledged) {
        const todo = await collection.findOne({ _id: result.insertedId }); // Return the created todo
        res.status(201).json(todo); // Send the created todo back to the client
      } else {
        res.status(400).json({ message: "Todo could not be created" });
      }
    } catch (e: any) {
      res.status(500).json({ message: e.message });
    }
  });

  // Update an existing todo by ID
  router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
      const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData },
      );
      if (result.modifiedCount === 1) {
        res.json({ message: "Todo updated successfully." });
      } else {
        res.status(404).json({ message: "Todo not found" });
      }
    } catch (e: any) {
      res.status(500).json({ message: e.message });
    }
  });

  // Delete an existing todo by ID
  router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
      const result = await collection.deleteOne({ _id: new ObjectId(id) });
      if (result.deletedCount === 1) {
        res.json({ message: "Todo deleted successfully" });
      } else {
        res.status(404).json({ message: "Todo not found" });
      }
    } catch (e: any) {
      res.status(500).json({ message: e.message });
    }
  });

  return router;
}
