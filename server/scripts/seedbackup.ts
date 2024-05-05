import { connectToDatabase } from "../src/config/db";

async function seedData() {
  const db = await connectToDatabase();

  if (!db) {
    console.error("Unable to connect to database");
    return;
  }

  const users = db.collection("users");
  const tasks = db.collection("tasks");

  // Find testUser1
  const testUser1 = await users.findOne({ username: "testUser1" });

  if (!testUser1) {
    console.error("testUser1 not found");
    return;
  }

  // Insert tasks associated with testUser1
  await tasks.updateMany(
    {},
    {
      $set: {
        userId: testUser1._id,
      },
    },
  );
}

seedData().catch(console.error);
