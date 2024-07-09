import { connectToDatabase } from "../src/config/db";
import { Db } from "mongodb";
import {
  titles,
  descriptions,
  priorities,
  categories,
} from "./fields/taskfields";
import { names, userNames } from "./fields/userFields";
import * as bcrypt from "bcrypt";

async function randomizeTaskUserAssociation(db: Db) {
  const users = await db?.collection("users").find().toArray();
  const tasks = await db?.collection("tasks").find().toArray();

  for (const task of tasks) {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    await db?.collection("tasks").updateOne(
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

async function seedUsers(db: Db) {
  for (let i = 0; i < userNames.length; i++) {
    const password = "password";
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);

    await db?.collection("users").insertOne({
      username: userNames[Math.floor(Math.random() * userNames.length)],
      password: hashedPassword,
      profilePicture: "https://www.google.com",
      credentials: {
        firstName: names[Math.floor(Math.random() * names.length)].firstName,
        lastName: names[Math.floor(Math.random() * names.length)].lastName,
        email: `${userNames[i].toLowerCase()}@mail.com`,
      },
    });
  }

  console.log("Users seeded");

  return;
}

async function seedTasks(db: Db, amountOfTasks: number) {
  // aparantly the categories doesnt import correctly from the taskfields.ts file so I just add it here for now..
  const categories = ["private", "business", "work", "hobby"];

  for (let i = 0; i < amountOfTasks; i++) {
    await db?.collection("tasks").insertOne({
      title: titles[Math.floor(Math.random() * titles.length)],
      description:
        descriptions[Math.floor(Math.random() * descriptions.length)],
      category: categories[Math.floor(Math.random() * categories.length)],
      dueDate: "2021-12-12",
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      userId: null,
    });
  }

  console.log("Tasks seeded");

  return;
}

async function main() {
  // const { db, client } = await connectToDatabase();
  const connection = await connectToDatabase();

  if (!connection) {
    console.error("Unable to connect to database");
    return;
  }

  const { db, client } = connection;

  try {
    // 10 users
    await seedUsers(db);
    await seedTasks(db, 200);
    await randomizeTaskUserAssociation(db);
  } catch (err) {
    console.error("An error occurred while seeding the database:", err);
    return;
  }

  client.close();
  console.log(
    "Database seeded and associated successfully - connection closed",
  );
}

main().catch((err) => {
  console.log("An error occurred while attempting to seed the database:", err);
});
