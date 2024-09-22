import { Todo } from "../models/todo.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  BAD_REQUEST,
  CREATED,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  OK,
  TODO_STATUS,
} from "../utils/constants.js";

export const createTodo = asyncHandler(async (req, res, next) => {
  const { title, description } = req.body;
  if ([title, description].some((field) => !field || field.trim() === "")) {
    return next(new ApiError(BAD_REQUEST, "All fields are required"));
  }
  const todo = await Todo.create({ title, description, userId: req.user._id });
  if (!todo) {
    return next(new ApiError(INTERNAL_SERVER_ERROR, "Something went wrong"));
  }
  res
    .status(CREATED)
    .json(new ApiResponse(CREATED, "Todo created successfully", todo));
});

export const getTodos = asyncHandler(async (req, res, next) => {
  const todos = await Todo.find({ userId: req.user._id }).select("-createdAt -updatedAt -__v -userId");
  res.status(OK).json(new ApiResponse(OK, "Todos fetched successfully", todos));
});

export const updateTodo = asyncHandler(async (req, res, next) => {
  const { title, description, status } = req.body;
  const todoId = req.params.id;
  if (!todoId) return next(new ApiError(BAD_REQUEST, "todoId is required"));
  const todo = await Todo.findOne({ _id: todoId, userId: req.user._id });
  if (!todo) return next(new ApiError(NOT_FOUND, "Todo not found"));
  if (title && title.trim() !== "") todo.title = title.trim();
  if (description && description.trim() !== "")
    todo.description = description.trim();
  if (status && TODO_STATUS.includes(status)) todo.status = status.trim();
  await todo.save();
  res.status(OK).json(new ApiResponse(OK, "Todo updated successfully", todo));
});

export const deleteTodo = asyncHandler(async (req, res, next) => {
  const todoId = req.params.id;
  if (!todoId) return next(new ApiError(BAD_REQUEST, "todoId is required"));
  await Todo.findOneAndDelete({ _id: todoId, userId: req.user._id });
  res.status(OK).json(new ApiResponse(OK, "Todo deleted successfully"));
});
