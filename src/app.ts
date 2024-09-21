import express from "express";
import helmet from "helmet";
import compression from "compression";

import morgan from "morgan";
const app = express();

export default app;

// load middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
// app.use(morgan("combined"));
// app.use(morgan("common"));
// app.use(morgan("short"));
// app.use(morgan("tiny"));
// load database

// load route

app.get("/", (req, res, next) => {
  const strCompress = "Hello would";

  return res.status(200).json({
    message: "Test morgan",
    metadata: strCompress.repeat(1000),
  });
});

// check exceptions
