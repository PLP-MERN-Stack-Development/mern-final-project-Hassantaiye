import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(
      `\n🟢 MongoDB Connected: ${conn.connection.host}\n`
    );
  } catch (error) {
    console.error(`❌ MongoDBDB Connection Error: ${error.message}`);
    process.exit(1); // Stop the server if DB fails
  }
};

export default connectDB;
