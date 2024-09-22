import express from "express";
import { deleteUser, loadUser, login, logout, register, updateUser } from "../controllers/user.controller.js";
import {authenticate} from "../middlewares/auth.middleware.js";

const router = express.Router();  

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(authenticate, logout);
router.route("/single")
      .put(authenticate, updateUser)
      .delete(authenticate, deleteUser);
router.route("/me").get(authenticate, loadUser);

export default router;