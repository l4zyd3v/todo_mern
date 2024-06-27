import express from "express";
import cors from "cors";
import { connectToDatabase } from "./config/db";
import { userRoutes } from "./routes/userRoutes";
import { authRoutes } from "./routes/authRoutes";
import { taskRoutes } from "./routes/taskRoutes";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(
  cors({
    origin: "http://192.168.1.207:5173/signup",
    // origin: "process.env.FRONTEND_URL",
    optionsSuccessStatus: 200,
    credentials: true,
  }),
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  next();
});

async function startServer() {
  const db = await connectToDatabase();
  if (db) {
    // app.use("/", userRoutes(db));
    app.use("/", authRoutes(db));
    app.use("/", taskRoutes(db));

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server is running at http://0.0.0.0:${PORT}`);
    });
  }
}
startServer();
