import mongoose from "mongoose";
import { serialize } from "cookie";
import jwt from "jsonwebtoken";
import { User } from "../models/user";

export const connectDB = async () => {
  const { connection } = await mongoose.connect(process.env.MONGO_URI, {
    dbName: "Todo13",
  });
  console.log(`Database Connected on ${connection.host}`);
};

export const cookieSetter = (res, token, set) => {
  const isProd = process.env.NODE_ENV === "production";

  res.setHeader(
    "Set-Cookie",
    serialize("token", set ? token : "", {
      path: "/",
      httpOnly: true,
      secure: isProd, // Only use Secure in production
      sameSite: isProd ? "Strict" : "Lax", // More strict in production for security
      maxAge: set ? 15 * 24 * 60 * 60 * 1000 : 0,
      domain: isProd ? process.env.COOKIE_DOMAIN : undefined, // Optional domain setting for production
    })
  );
};

export const generateToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "15d" });
};

export const checkAuth = async (req) => {
  const cookie = req.headers.cookie;
  if (!cookie) return null;

  const token = cookie.split("=")[1];
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return await User.findById(decoded._id);
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
};
