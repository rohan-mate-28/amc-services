import mongoose from "mongoose";
const conectdb = async () => {
  try {
    await mongoose.connect(process.env.MONGODBURL);
    console.log("database connected");
  } catch (e) {
    console.error("❌ MongoDB connection failed:", e.message);
    process.exit(1);  
}   
};
export default conectdb;
