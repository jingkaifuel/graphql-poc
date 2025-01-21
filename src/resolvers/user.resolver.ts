import jwt from "jsonwebtoken";

import { User } from "../models";
import { IUser } from "../models/user.model";

export const userResolver = {
  Query: {
    // Get current logged in user details
    getCurrentUser: async (_, __, { user }): Promise<IUser[]> => {
      return await user;
    },
  },

  Mutation: {
    // Login with username and password
    login: async (_, { username, password }, { res }) => {
      const user = await User.findOne({
        username,
        password,
      });
      if (!user) throw new Error("Invalid username or password");

      // Sign the access token to keep user authorised
      const token = jwt.sign(
        { userId: user._id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1h" }
      );

      // To refresh the access token if it expires, if Refresh Token is expired,
      // user will need to login again
      const refreshToken = jwt.sign(
        { userId: user._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );
      // Assigning refresh token in http-only cookie
      res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      return { token, user };
    },
    refresh: async (_, { token }, context) => {
      // Verifying refresh token
      const decoded = await jwt.verify(
        token,
        process.env.REFRESH_TOKEN_SECRET,
        async (err) => {
          if (err) {
            // Wrong Refesh Token
            throw new Error("Unauthorized");
          }
        }
      );

      const user = await User.findById(decoded["userId"]);

      // Correct token we send a new access token
      const accessToken = jwt.sign(
        { userId: user._id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "10m" }
      );

      return { token: accessToken, user };
    },
  },
};
