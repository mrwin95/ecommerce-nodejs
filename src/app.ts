import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import compression from "compression";

import morgan from "morgan";

import { Database } from "./dbs/init.mongodb";
import { countConnect, checkOverConnection } from "./helpers/check.connect";
const app = express();

export default app;

// load env
dotenv.config();
// load middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
// app.use(morgan("combined"));
// app.use(morgan("common"));
// app.use(morgan("short"));
// app.use(morgan("tiny"));
// load database
// require("./dbs/init.mongodb");
Database.initialize();
countConnect();
checkOverConnection();
// load route

// check exceptions
