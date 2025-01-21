import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "./user.model";

export interface IPost extends Document {
  _id: string;
  content: string;
  createdBy: IUser;
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema: Schema<IPost> = new mongoose.Schema({
  content: { type: String, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date },
});

const Post = mongoose.model<IPost>("Post", PostSchema);

export default Post;
