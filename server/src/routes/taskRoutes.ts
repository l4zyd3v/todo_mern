import { Router } from "express";
import { Db } from "mongodb"; // import Db type for type checking
import taskController from "../controllers/taskController";
import authController from "../controllers/authController";

export function taskRoutes(db: Db) {
  const controller = taskController(db);
  const authControl = authController(db);
  const router = Router();

  router.get("/tasks", authControl.authenticateToken, controller.getAllTasks);
  router.put(
    "/tasks/setcompleted/:taskId",
    authControl.authenticateToken,
    controller.setCompletion,
  );
  router.post(
    // make it /tasks/newtask
    "/newtask",
    authControl.authenticateToken,
    controller.createNewTask,
  );
  router.put(
    "/tasks/configuretask/:taskId",
    authControl.authenticateToken,
    controller.confiugreTask,
  );
  router.delete(
    "/tasks/delete/:taskId",
    authControl.authenticateToken,
    controller.deleteTask,
  );

  return router;
}
