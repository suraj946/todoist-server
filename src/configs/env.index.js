import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

export const MONGO_URI = process.env.MONGO_URI;
export const PORT = process.env.PORT;
export const CORS_ORIGINS = process.env.CORS_ORIGINS;

export const JWT_EXPIRES = process.env.JWT_EXPIRES;
export const JWT_SECRET = process.env.JWT_SECRET;

export const NODE_ENV = process.env.NODE_ENV;

export const COOKIE_EXPIRE = process.env.COOKIE_EXPIRE;

