import express from "express";
import cors from "cors";
import { connectToDatabase } from "./config/db";
import { userRoutes } from "./routes/userRoutes";
import { taskRoutes } from "./routes/taskRoutes";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(
  cors({
    origin: `http://192.168.1.207:5173`,
    optionsSuccessStatus: 200,
    credentials: true,
  }),
);
app.use(bodyParser.json());

async function startServer() {
  const db = await connectToDatabase();
  if (db) {
    app.use("/", userRoutes(db));
    app.use("/", taskRoutes(db));

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server is running at http://0.0.0.0:${PORT}`);
    });
  }
}
startServer();
