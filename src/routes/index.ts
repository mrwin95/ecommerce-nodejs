"use strict";

import express from "express";
import routerAccess from "./access";
const router = express.Router();

router.use("/v1/api", routerAccess);
export default router;
