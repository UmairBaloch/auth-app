import mongoose from "mongoose";

const localDB = `mongodb://localhost:27017/auth_app`;

const connectDB = async () => {
  await mongoose.connect(localDB);
  console.log("MongoDB Connected");
};

export default connectDB;
