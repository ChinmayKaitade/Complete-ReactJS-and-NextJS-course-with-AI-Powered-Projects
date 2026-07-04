import mongoose from "mongoose";

export async function dbConnect() {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);

    console.log("Connection Successful!🟢",connection);
  } catch (error) {
    throw new Error(error);
  }
}
