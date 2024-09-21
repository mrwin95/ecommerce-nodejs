import mongoose from "mongoose";

const connectStr = "mongodb://localhost:27021/shopDEV";

mongoose
  .connect(connectStr)
  .then((_) => console.log("Connected Mongodb Success"))
  .catch((err) => console.log("Error connect", err));

export default mongoose;
