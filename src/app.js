import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { CORS_ORIGINS } from "./configs/env.index.js";
import {error} from "./middlewares/error.middlewares.js"

const app = express();

app.use(cors({
  origin: CORS_ORIGINS,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("TODOIST server is up and running");
});

//Import routes
import userRoute from "./routes/user.route.js";
import todoRoute from "./routes/todo.route.js";

//Use routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/todo", todoRoute);


app.use(error);
export default app;