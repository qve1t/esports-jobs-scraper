import { connect } from "mongoose";

const connectDB = async (): Promise<void> => {
  await connect(process.env.MONGODB_URL || "mongodb://localhost:27017/scraper");

  console.log("[database]: Connected");
};

export default connectDB;
