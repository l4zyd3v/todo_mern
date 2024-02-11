import express from "express";
import { connectToDatabase } from "./config/db";
import { todoRoutes } from "./routes/todoRoutes";

const app = express();
const PORT = 3000;

app.use(express.json());

async function startServer() {
  const db = await connectToDatabase();
  if (db) {
    app.use("/todos", todoRoutes(db));
  }

  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}

startServer();
