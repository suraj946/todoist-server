import express from "express";
import {authenticate} from "../middlewares/auth.middleware.js";
import { createTodo, deleteTodo, getTodos, updateTodo } from "../controllers/todo.controller.js";

const router = express.Router();  

router.route("/create").post(authenticate, createTodo);
router.route("/all").get(authenticate, getTodos);
router.route("/single/:id")
      .put(authenticate, updateTodo)
      .delete(authenticate, deleteTodo);

export default router;