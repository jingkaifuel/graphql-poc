import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  _id: string;
  username: string;
  password: string;
  email: string;
}

export const UserSchema: Schema<IUser> = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String },
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
