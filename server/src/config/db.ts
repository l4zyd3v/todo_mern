import { MongoClient } from "mongodb";

const mongoUrl = "mongodb://0.0.0.0:27017/todoApp";
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
