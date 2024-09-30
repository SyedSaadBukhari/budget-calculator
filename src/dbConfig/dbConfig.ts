import mongoose from "mongoose";

export async function connect() {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error("MONGO_URL environment variable is not defined.");
    }

    await mongoose.connect(process.env.MONGO_URL);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Connected to database MongoDB");
    });

    connection.on("disconnected", () => {
      console.log("Disconnected from MongoDB");
    });

    connection.on("error", (error) => {
      console.log("Error connecting to database", error);
      process.exit(1);
    });
  } catch (error) {
    console.error("Error connecting to database", error);
    process.exit(1);
  }
}
