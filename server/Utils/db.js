import mongoose from "mongoose";

const conectdb = (onConnected) => {
  const connectWithRetry = () => {
    mongoose.connect(process.env.MONGODBURL, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    })
    .then(() => {
      console.log("✅ MongoDB connected");
      if (onConnected) onConnected();  
    })
    .catch((err) => {
      console.error("❌ MongoDB connection failed, retrying in 5 sec...", err.message);
      setTimeout(connectWithRetry, 5000);
    });
  };

  connectWithRetry();
};

export default conectdb;
