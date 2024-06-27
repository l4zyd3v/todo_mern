import { ObjectId, Db } from "mongodb";
import { Request, Response } from "express";
// import bcrypt from "bcrypt";
// import createSecretToken from "../tokenGeneration";

function getAllTasks() {}

export default function taskController(db: Db) {
  return {
    getAllTasks: async (req: Request, res: Response) => {
      try {
        const collection = db.collection("tasks");
        const tasks = await collection.find({}).toArray();
        console.log("all tasks requested");
        return res.status(200).json(tasks);
      } catch (error: any) {
        console.log("oops something wrong daiiim");
        res.status(500).json({ message: error.message });
      }
    },
  };
}
