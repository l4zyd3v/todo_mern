import express from "express";
import cors from "cors";
import { connectToDatabase } from "./config/db";
import { taskRoutes } from "./routes/taskRoutes";
import { userRoutes } from "./routes/userRoutes";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

async function startServer() {
  const db = await connectToDatabase();
  if (db) {
    app.use("/tasks", taskRoutes(db));
    app.use("/signup", userRoutes(db));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
