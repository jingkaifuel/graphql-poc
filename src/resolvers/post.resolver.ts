import { Post } from "../models";
import { IPost } from "../models/post.model";

export const postResolver = {
  Query: {
    // Get all available posts
    getPosts: async (): Promise<IPost[]> => {
      return await Post.find().populate("createdBy");
    },
    // Get post by ID
    getPost: async (_, { _id }): Promise<IPost> => {
      return await Post.findById({ _id }).populate("createdBy");
    },
    // Get all posts created by the logged in user
    getSelfPosts: async (_, __, { user }): Promise<IPost[]> => {
      return await Post.find({ createdBy: user._id }).populate("createdBy");
    },
  },

  Mutation: {
    // Create a post
    createPost: async (_, { content }, { user }): Promise<IPost> => {
      if (!user) throw new Error("Unauthorised");

      const now = new Date().toString();
      const post = (
        await Post.create({
          content,
          createdBy: user._id,
          createdAt: now,
        })
      ).populate("createdBy");
      return post;
    },

    // Update an existing post at given post ID
    updatePost: async (_, { _id, content }, { user }): Promise<IPost> => {
      if (!user) throw new Error("Unauthorised");

      const now = new Date().toString();
      const post = await Post.findOneAndUpdate(
        { _id, createdBy: user._id },
        { content, updatedAt: now }
      ).populate("createdBy");

      if (!post) throw new Error("Post not found or no permission");

      return post;
    },
  },
};
