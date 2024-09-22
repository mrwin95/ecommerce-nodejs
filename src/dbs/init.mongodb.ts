"use strict";
import mongoose from "mongoose";

const {
  db: { host, port, name },
} = require("../configs/config.mongo");

const connectStr = `mongodb://${host}:${port}/${name}`;

export class Database {
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

  static initialize(): void {
    this.getInstance();
  }
}

// const instanceDatabase = Database.getInstance();

// export default instanceDatabase;
