import { JWT_SECRET } from "../configs/env.index.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { UNAUTHORIZED } from "../utils/constants.js";

export const authenticate = asyncHandler(async (req, _, next) => {
  const token =
    req.cookies?.token ||
    req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    throw new ApiError(UNAUTHORIZED, "Please login to access this resource");
  }

  const jwtData = jwt.verify(token, JWT_SECRET);
  const user = await User.findById(jwtData?._id).select("+password");

  if (!user) {
    return next(new ApiError(UNAUTHORIZED, "Please login to access this resource"));
  }

  req.user = user;
  next();
});
