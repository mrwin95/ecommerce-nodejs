"use strict";
import mongoose from "mongoose";
const connectStr = "mongodb://localhost:27021/shopDEV";

class Database {
  static instance: Database;
  constructor() {
    this.connect();
  }

  connect(type = "mongo") {
    if (1 === 1) {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }
    mongoose
      .connect(connectStr, {
        maxPoolSize: 50,
      })
      .then((_) => console.log("Connected Mongodb Success PRO"))
      .catch((err) => console.log("Error connect", err));
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }
}

const instanceDatabase = Database.getInstance();

export default instanceDatabase;
