import express from "express";
import morgan from "morgan";
const app = express();

export default app;

// load middleware
app.use(morgan("dev"));
// load database

// load route

app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Test morgan",
  });
});

// check exceptions
