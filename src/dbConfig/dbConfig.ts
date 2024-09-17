import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Connected to database MongoDB");
    });

    connection.on("error", (error) => {
      console.log("Error connecting to database", error);
      process.exit();
    });
  } catch (error) {
    console.log("Error connecting to database", error);
  }
}
