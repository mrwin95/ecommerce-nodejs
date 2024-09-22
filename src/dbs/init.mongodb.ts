"use strict";
import mongoose from "mongoose";
import config from "../configs/config.mongo";

const connectStr = `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`;

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
