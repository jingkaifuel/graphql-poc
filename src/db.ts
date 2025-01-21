import mongoose from "mongoose";

const connectToDatabase = async (): Promise<void> => {
  const dbURI = process.env.MONGODB_URI;
  try {
    await mongoose.connect(dbURI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

export default connectToDatabase;
