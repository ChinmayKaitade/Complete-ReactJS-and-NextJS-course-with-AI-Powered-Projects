import mongoose from "mongoose";

export async function connectDB() {
  try {
    const conn = await mongoose.connect("mongodb://localhost:27017/notes-app");
    // console.log(conn);
    console.log("Database Connected Successfully!🟢");
  } catch (error) {
    throw new Error(error);
  }
}
