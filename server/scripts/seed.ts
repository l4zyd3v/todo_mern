import { connectToDatabase } from "../src/config/db";
import { ObjectId, Db } from "mongodb";
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

  console.log("task-user association randomized");

  return;
}

async function randomizeTaskCategoriesAssociation(db: Db) {
  const tasks = await db?.collection("tasks").find().toArray();
  const categories = await db?.collection("categories").find().toArray();

  for (let task of tasks) {
    const taskUserId = task.userId.toString();

    const matchingCategories = categories.filter(
      (category) => category.userId.toString() === taskUserId,
    );

    if (matchingCategories.length > 0) {
      const randomCategory =
        matchingCategories[
          Math.floor(Math.random() * matchingCategories.length)
        ];

      await db?.collection("tasks").updateOne(
        { _id: new ObjectId(task._id) },
        {
          $set: {
            categoryId: new ObjectId(randomCategory._id),
          },
        },
      );
    }
  }

  console.log("task-category association randomized");

  return;
}

async function seedCategories(db: Db) {
  const categories = [
    {
      name: "business",
      color: "#ea06fe",
      userId: null,
    },
    {
      name: "personal",
      color: "#1754bd",
      userId: null,
    },
  ];

  await db?.collection("categories").drop();
  console.log("previous categories collection dropped");

  for (let i = 0; i < userNames.length; i++) {
    const user = await db
      ?.collection("users")
      .find({ username: `${userNames[i]}` })
      .toArray();

    await db?.collection("categories").insertMany(
      categories.map((category) => ({
        ...category,
        userId: user[0]._id,
      })),
    );
  }

  console.log("new categories seeded");

  return;
}

async function seedUsers(db: Db) {
  await db?.collection("users").drop();
  console.log("previous users collection dropped");

  for (let i = 0; i < userNames.length; i++) {
    const password = "password";
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);

    await db?.collection("users").insertOne({
      username: userNames[i],
      password: hashedPassword,
      profilePicture: "https://www.google.com",
      credentials: {
        firstName: names[Math.floor(Math.random() * names.length)].firstName,
        lastName: names[Math.floor(Math.random() * names.length)].lastName,
        email: `${userNames[i].toLowerCase()}@mail.com`,
      },
    });
  }

  console.log("new users seeded");

  return;
}

async function seedTasks(db: Db, amountOfTasks: number) {
  await db?.collection("tasks").drop();
  console.log("previous tasks collection dropped");

  for (let i = 0; i < amountOfTasks; i++) {
    await db?.collection("tasks").insertOne({
      title: titles[Math.floor(Math.random() * titles.length)],
      description:
        descriptions[Math.floor(Math.random() * descriptions.length)],
      dueDate: "2025-01-01",
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      completed: false,
      userId: null,
      categoryId: null,
    });
  }

  console.log("new tasks seeded");

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
    await seedCategories(db);
    await randomizeTaskUserAssociation(db);
    await randomizeTaskCategoriesAssociation(db);
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
