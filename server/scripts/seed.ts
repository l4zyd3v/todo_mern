import { connectToDatabase } from "../src/config/db";
import { Db } from "mongodb"; // Import the Db type

// for later use perhaps
// function randomizeFieldValue(arrOfValues: []) {
//   let randomValue = arrOfValues[Math.floor(Math.random() * arrOfValues.length)];
//   return randomValue;
// }

import { names, userNames } from "./userFields";

async function seedUsers(db: Db) {
  for (let i = 0; i < userNames.length; i++) {
    await db.collection("users").insertOne([
      {
        username: userNames[Math.floor(Math.random() * userNames.length)],
        password: "password",
        profilePicture: "https://www.google.com",
        credentials: {
          firstName: names[Math.floor(Math.random() * names.length)].firstName,
          lastName: names[Math.floor(Math.random() * names.length)].lastName,
          email: `${userNames[i].toLowerCase()}@mail.com`,
        },
      },
    ]);
  }

  console.log("Users seeded");

  return;
}

async function randomizeTaskUserAssociation(db: Db) {
  const users = await db.collection("users").find().toArray();
  const tasks = await db.collection("tasks").find().toArray();

  for (const task of tasks) {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    await db.collection("tasks").updateOne(
      { _id: task._id },
      {
        $set: {
          userId: randomUser._id,
        },
      },
    );
  }

  console.log("Task-user association randomized");

  return;
}

import { titles, descriptions, priorities } from "./taskfields";

async function seedTasks(db: Db, amountIfTasks: number) {
  for (let i = 0; i < amountIfTasks; i++) {
    await db.collection("tasks").insertOne([
      {
        title: titles[Math.floor(Math.random() * titles.length)],
        description:
          descriptions[Math.floor(Math.random() * descriptions.length)],
        dueDate: "2021-12-12",
        priority: priorities[Math.floor(Math.random() * priorities.length)],
        userId: "nothinh for now..",
      },
    ]);
  }

  console.log("Tasks seeded");

  return;
}

async function main() {
  const db = await connectToDatabase();

  if (!db) {
    console.error("Unable to connect to database");
    return;
  }
  // 10 users
  await seedUsers(db);
  await seedTasks(db, 200);

  return;
}

main().catch((err) => {
  console.log("An error occurred while attempting to seed the database:", err);
});
