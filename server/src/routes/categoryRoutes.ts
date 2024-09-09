import { Router } from "express";
import { Db } from "mongodb"; // import Db type for type checking
import categoryController from "../controllers/categoryController";
import authController from "../controllers/authController";

export function categoryRoutes(db: Db) {
  const controller = categoryController(db);
  const authControl = authController(db);
  const router = Router();

  router.get(
    "/categories",
    authControl.authenticateToken,
    controller.getAllCategories,
  );
  router.post(
    "/categories/:userId",
    authControl.authenticateToken,
    controller.createCategory,
  );
  router.get(
    "/categories/:categoryId/checktasks",
    authControl.authenticateToken,
    controller.checkCategoryTasks,
  );
  router.delete(
    "/deletecategory/:categoryId",
    authControl.authenticateToken,
    controller.deleteCategory,
  );
  router.delete(
    "/deletecategory-tasks/:categoryId",
    authControl.authenticateToken,
    controller.deleteCategoryAndTasks,
  );

  return router;
}
