"use strict";

import express from "express";
import routerAccess from "./access";
import { apiKey, permission } from "../auth/checkAuth";
const router = express.Router();

router.use(apiKey);
router.use(permission("0000"));
router.use("/v1/api", routerAccess);
export default router;
