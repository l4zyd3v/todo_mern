import { Router } from "express";
import { Db } from "mongodb"; // import Db type for type checking
import taskController from "../controllers/taskController";
import authController from "../controllers/authController";

export function taskRoutes(db: Db) {
  const controller = taskController(db);
  const authControl = authController(db);
  const router = Router();

  router.get("/tasks", authControl.authenticateToken, controller.getAllTasks);

  return router;
}

// import { Router } from "express";
// import { Db, ObjectId } from "mongodb"; // import Db type for type checking
// import { body, validationResult } from "express-validator";
//
// export function taskRoutes(db: Db) {
//   const router = Router();
//   const collection = db.collection("tasks");
//
//   // Fetch all todos
//   router.get("/", async (req, res) => {
//     try {
//       const tasks = await collection.find({}).toArray();
//       res.json(tasks);
//       console.log("User requested all tasks");
//     } catch (e: any) {
//       res.status(500).json({ message: e.message });
//     }
//   });
//
//   // Fetch a single todo by ID
//   router.get("/:id", async (req, res) => {
//     const { id } = req.params;
//
//     try {
//       const tasks = await collection.findOne({ _id: new ObjectId(id) });
//       if (tasks) {
//         res.json(tasks);
//         console.log("User requested a single tasks by ID");
//       } else {
//         res.status(404).json({ message: "Tasks not found" });
//       }
//     } catch (e: any) {
//       res.status(500).json({ message: e.message });
//     }
//   });
//
//   // Create a todo
//   router.post("/", async (req, res) => {
//     try {
//       const newTasks = req.body; // Assuming the body contains the todo structure
//       const result = await collection.insertOne(newTasks);
//       if (result.acknowledged) {
//         const task = await collection.findOne({ _id: result.insertedId }); // Return the created todotasks
//         res.status(201).json(task); // Send the created todo back to the clienttasks
//       } else {
//         res.status(400).json({ message: "Todo could not be created" });
//       }
//     } catch (e: any) {
//       res.status(500).json({ message: e.message });
//     }
//   });
//
//   // Update an existing todo by ID
//   router.put("/:id", async (req, res) => {
//     const { id } = req.params;
//     const updateData = req.body;
//
//     try {
//       const result = await collection.updateOne(
//         { _id: new ObjectId(id) },
//         { $set: updateData },
//       );
//       if (result.modifiedCount === 1) {
//         res.json({ message: "Tasks updated successfully." });
//       } else {
//         res.status(404).json({ message: "Tasks not found" });
//       }
//     } catch (e: any) {
//       res.status(500).json({ message: e.message });
//     }
//   });
//
//   // Delete an existing todo by ID
//   router.delete("/:id", async (req, res) => {
//     const { id } = req.params;
//
//     try {
//       const result = await collection.deleteOne({ _id: new ObjectId(id) });
//       if (result.deletedCount === 1) {
//         res.json({ message: "Tasks deleted successfully" });
//       } else {
//         res.status(404).json({ message: "Tasks not found" });
//       }
//     } catch (e: any) {
//       res.status(500).json({ message: e.message });
//     }
//   });
//
//   return router;
// }
