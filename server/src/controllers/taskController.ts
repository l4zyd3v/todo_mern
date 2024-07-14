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
  };
}
