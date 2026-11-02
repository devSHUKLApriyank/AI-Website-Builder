import mongoose from "mongoose";

export async function connectToDatabase() {
  mongoose.connection.on("connected", () => {
    console.log("Successfully connected to MongoDB");
  });

  mongoose.connection.on("error", (err) => {
    console.error(`[MongoDB] Connection error: ${err.message}`);
  });

  try {
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (err) {
    console.error(`[MongoDB] Failed to connect: ${err.message}`);
    process.exit(1);
  }
}