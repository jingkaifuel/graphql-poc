import jwt from "jsonwebtoken";
import { User } from "./models";

export const getLoggedInUser = async (req) => {
  const token = req.headers.authorization || "";
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded["userId"]);
    return user;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};
