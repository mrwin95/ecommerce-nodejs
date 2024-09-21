"use strict";

import mongoose from "mongoose";
import os from "os";
import process from "process";

const _SECONDS: number = 5000;
// count connection
const countConnect = () => {
  const numberOfConnection = mongoose.connections.length;
  console.log(`Number of connection: ${numberOfConnection}`);
};

// check over connection

const checkOverConnection = () => {
  setInterval(() => {
    const numConnection = mongoose.connections.length;
    const numCores = os.cpus().length;
    const memoryUsage = process.memoryUsage().rss;
    const maxConnections = numCores * 5;

    console.log(`Active connections: ${numConnection}`);
    console.log(`Memory usage: ${memoryUsage / 1024 / 1024} Mb`);

    if (numConnection > maxConnections) {
      console.log(`Connection overload detected!`);
    }
  }, _SECONDS);
};
module.exports = {
  countConnect,
  checkOverConnection,
};
