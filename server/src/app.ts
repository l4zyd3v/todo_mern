import express from "express";
import cors from "cors"; // Changed this line
import { connectToDatabase } from "./config/db";
import { todoRoutes } from "./routes/todoRoutes";

const app = express();
// const cors = require("cors");
const PORT = 3000;

app.use(express.json());
app.use(cors());

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
