import { ObjectId, Db } from "mongodb";
import { Request, Response } from "express";
// import bcrypt from "bcrypt";
// import createSecretToken from "../tokenGeneration";

export default function taskController(db: Db) {
  return {
    getAllTasks: async (req: Request, res: Response) => {
      const { userId } = req;

      console.log("hello from taskController.ts");

      console.log("userId: ", userId);

      try {
        const collection = db.collection("tasks");

        const userTasks = await collection
          .find({ userId: new ObjectId(userId) })
          .toArray();

        console.log("User requested all tasks");
        return res.status(200).json(userTasks);
      } catch (error: any) {
        console.log("oops something wrong daiiim");
        res.status(500).json({ message: error.message });
      }
    },
    setCompplition: async (req: Request, res: Response) => {
      const { taskId } = req.params;
      const { completed } = req.body;

      if (!ObjectId.isValid(taskId)) {
        return res.status(400).send("Invalid taskId");
      }

      try {
        const collection = db.collection("tasks");

        const task = await collection.findOne({ _id: new ObjectId(taskId) });

        if (task) {
          const result = await collection.updateOne(
            { _id: new ObjectId(taskId) },
            { $set: { completed: completed } },
          );

          if (result.modifiedCount === 1) {
            res.json({
              message: "Tasks updated successfully",
              completed: completed,
            });
          } else {
            res.status(404).json({ message: "Tasks not found" });
          }
        }
      } catch (e: any) {
        res.status(500).json({ message: e.message });
      }
    },

    // **This is for deleting a task**
    // deleteTask: async (req: Request, res: Response) => {
    //   const taskId = req.params.taskId;
    //
    //   try {
    //     const result = await db.collection("tasks").deleteOne({
    //       _id: new ObjectId(taskId),
    //     });
    //     if (result.deletedCount === 1) {
    //       res.json({ message: "Tasks deleted successfully" });
    //     } else {
    //       res.status(404).json({ message: "Tasks not found" });
    //     }
    //   } catch (e: any) {
    //     res.status(500).json({ message: e.message });
    //   }
    // },
  };
}
