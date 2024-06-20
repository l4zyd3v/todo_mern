import { MongoClient } from "mongodb";
import { config as configEnv } from "dotenv";

configEnv();

const mongoUrl = process.env.MONGO_URL as string;
const client = new MongoClient(mongoUrl);

export async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    const db = client.db("todoApp");
    return db;
  } catch (e) {
    console.error(`Could not connect to db`, e);
  }
}
