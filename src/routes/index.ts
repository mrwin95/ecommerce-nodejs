"use strict";

import express from "express";
const router = express.Router();

router.get("/", (req, res, next) => {
  const strCompress = "Hello would";

  return res.status(200).json({
    message: "Test morgan",
    metadata: strCompress.repeat(1000),
  });
});

module.exports = router;
