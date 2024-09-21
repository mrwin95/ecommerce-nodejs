import express from "express";
import helmet from "helmet";
import morgan from "morgan";
const app = express();

export default app;

// load middleware
app.use(morgan("dev"));
app.use(helmet());
// app.use(morgan("combined"));
// app.use(morgan("common"));
// app.use(morgan("short"));
// app.use(morgan("tiny"));
// load database

// load route

app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Test morgan",
  });
});

// check exceptions
