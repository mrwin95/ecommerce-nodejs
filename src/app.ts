import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import compression from "compression";
import bodyParser from "body-parser";
import morgan from "morgan";

import { Database } from "./dbs/init.mongodb";
import { DatabasePool } from "./dbs/init.mssql";
import { countConnect, checkOverConnection } from "./helpers/check.connect";
import router from "./routes";
import { ErrorResponse } from "./core/error.response";
import { StatusCode } from "./core/Error.StatusCode";
const app = express();

export default app;

// load env
dotenv.config();
// load middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(morgan("combined"));
// app.use(morgan("common"));
// app.use(morgan("short"));
// app.use(morgan("tiny"));
// load database
// require("./dbs/init.mongodb");
Database.initialize();
// console.log("1");

DatabasePool.initialize();
// console.log("2");

// countConnect();
// checkOverConnection();
// load route

app.use("/", router);
// check exceptions

app.use((req, res, next) => {
  const error = new ErrorResponse("Not Found", StatusCode.NOT_FOUND);
  next(error);
});

app.use((error: any, req: any, res: any, next: any) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";
  return res.status(statusCode).json({
    status: "error",
    code: error.statusCode,
    error: message,
  });
});
