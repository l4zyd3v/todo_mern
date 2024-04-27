import express from "express";
import cors from "cors"; // Changed this line
import { connectToDatabase } from "./config/db";
import { todoRoutes } from "./routes/todoRoutes";
import { categoriesRoutes } from "./routes/categoriesRoutes";

const app = express();
// const cors = require("cors");
const PORT = 3000;

app.use(express.json());
app.use(cors());

async function startServer() {
  const db = await connectToDatabase();
  if (db) {
    app.use("/todos", todoRoutes(db));
    app.use("/categories", categoriesRoutes(db));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
