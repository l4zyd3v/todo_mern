import { MongoClient } from "mongodb";

const mongoUrl = "your_mongodb_connection_string_here";
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
