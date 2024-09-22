import {asyncHandler} from "../utils/asyncHandler.js";
import {User} from "../models/user.model.js";
import {ApiError} from "../utils/ApiError.js";
import {sendToken} from "../utils/utility.js";
import {BAD_REQUEST, CONFLICT, CREATED, INTERNAL_SERVER_ERROR, NOT_FOUND, OK} from "../utils/constants.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {Todo} from "../models/todo.model.js"

export const register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  if ([name, email, password].some(field => !field || field.trim() === "")) {
    return next(new ApiError(BAD_REQUEST, "All fields are required"));
  }
  const existingUser = await User.findOne({ email });
  if(existingUser) {
    return next(new ApiError(CONFLICT, "User already exists with this email"));
  }
  const user = await User.create({ name, email, password });
  if(!user) {
    return next(new ApiError(INTERNAL_SERVER_ERROR, "Something went wrong"));
  }
  sendToken(user, CREATED, res, "Your account has been created");
});

export const login = asyncHandler(async (req, res, next) => {  
  const { email, password } = req.body;
  if ([email, password].some(field => !field || field.trim() === "")) {
    return next(new ApiError(BAD_REQUEST, "All fields are required"));
  }
  const user = await User.findOne({ email }).select("+password");
  if(!user) {
    return next(new ApiError(BAD_REQUEST, "Invalid email or password"));
  }
  const isPasswordCorrect = await user.isPasswordCorrect(password);
  if(!isPasswordCorrect) {
    return next(new ApiError(BAD_REQUEST, "Invalid email or password"));
  }
  sendToken(user, OK, res, "User logged in successfully");
});

export const logout = asyncHandler(async (req, res, next) => {  
  res
    .status(OK)
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .json(new ApiResponse(OK, "User logged out successfully"));
});

export const updateUser = asyncHandler(async (req, res, next) => {
  const { name, email } = req.body;
  const userId  = req.user._id;
  const user = await User.findById(userId);
  if(!user) {
    return next(new ApiError(NOT_FOUND, "User not found"));
  }
  if(email && user.email !== email?.trim()) {
    const existingUser = await User.findOne({ email });
    if(existingUser) {
      return next(new ApiError(CONFLICT, "User already exists with the given email"));
    }
  }
  user.name = name?.trim() || user.name;
  user.email = email?.trim() || user.email;
  await user.save();
  res.status(OK).json(new ApiResponse(OK, "User updated successfully"));
});

export const deleteUser = asyncHandler(async(req, res, next) => {
  const userId = req.user._id;
  const user = await User.findById(userId);
  if(!user){
    return next(new ApiError(NOT_FOUND, "User not found"));
  }
  await Todo.deleteMany({userId});
  await User.findByIdAndDelete(userId);
  res
    .status(OK)
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .json(new ApiResponse(OK, "User deleted successfully"));
})

export const loadUser = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const user = await User.findById(userId);
  if(!user) {
    return next(new ApiError(NOT_FOUND, "User not found"));
  }
  res.status(OK).json(new ApiResponse(OK, "User fetched successfully", user));
})