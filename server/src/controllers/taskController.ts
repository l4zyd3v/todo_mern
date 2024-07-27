import { ObjectId, Db } from "mongodb";
import { Request, Response } from "express";
// import bcrypt from "bcrypt";
// import createSecretToken from "../tokenGeneration";

type TaskType = {
  _id?: ObjectId;
  title: string;
  description?: string;
  dueDate?: string;
  priority?: string;
  completed?: boolean;
  userId: ObjectId;
  categoryId: ObjectId;
};

export default function taskController(db: Db) {
  return {
    getAllTasks: async (req: Request, res: Response) => {
      const { userId } = req;

      try {
        const collection = db.collection("tasks");

        const userTasks = await collection
          .find({ userId: new ObjectId(userId) })
          .toArray();

        console.log("User requested all tasks");
        return res.status(200).json(userTasks);
      } catch (error: any) {
        console.log("Something went wrong in taskcontroller/getAllTasks");
        res.status(500).json({ message: error.message });
      }
    },
    setCompletion: async (req: Request, res: Response) => {
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
            console.log("User updated the status of completed");
          } else {
            res.status(404).json({ message: "Tasks not found" });
          }
        }
      } catch (e: any) {
        res.status(500).json({ message: e.message });
      }
    },
    createNewTask: async (req: Request, res: Response) => {
      const { userId } = req;
      const { title, description, dueDate, categoryId, priority } = req.body;

      console.log(title, description, dueDate, categoryId, priority);

      try {
        const collection = db.collection("tasks");

        if (!title)
          return res.status(400).json({
            message: "Please Fill out a title in the input field",
          });

        if (!userId) {
          return res.status(400).json({
            message: "User ID is not provided",
          });
        }

        const newTask: TaskType = {
          title: title,
          description: description,
          dueDate: dueDate,
          categoryId: new ObjectId(categoryId),
          priority: priority,
          userId: new ObjectId(userId),
        };

        const result = await collection.insertOne(newTask);
        newTask._id = result.insertedId;

        console.log("User created a new task");

        return res.status(201).json(newTask);
      } catch (error: any) {
        console.log("Something went wrong in taskcontroller/createNewTask");
        res.status(500).json({ message: error.message });
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
