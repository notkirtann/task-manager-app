import express from "express";
import auth from "../middleware/auth.js";
import {
  createTask,
  getAllTasks,
  updateTaskById,
  deleteTask,
  getTaskById,
} from "../controllers/task.controller.js";

const router = express.Router();

router
  .route("/")
  .post(auth, createTask)
  .get(auth, getAllTasks);

router
  .route("/:id")
  .get(auth, getTaskById)
  .patch(auth, updateTaskById)
  .delete(auth, deleteTask);

export default router;