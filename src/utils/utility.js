import { COOKIE_EXPIRE, NODE_ENV } from "../configs/env.index.js";
import { ApiResponse } from "./ApiResponse.js";

export const cookieOptions = () => ({
  secure: NODE_ENV === "development" ? false : true,
  httpOnly: NODE_ENV === "development" ? false : true,
  sameSite: NODE_ENV === "development" ? false : "none",
});

export const sendToken = async (user, statusCode, res, message) => {
  const jwtToken = await user.generateJWTToken();
  user.password = undefined;
  user.__v = undefined;
  res
    .status(statusCode)
    .cookie("token", jwtToken, {
      ...cookieOptions(),
      expires: new Date(Date.now() + COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    })
    .json(
      new ApiResponse(statusCode, message, user)
    );
};