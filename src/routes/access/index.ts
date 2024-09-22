"use strict";

import express from "express";
import { AccessController } from "../../controllers/access.controller";
const routerAccess = express.Router();

const accessController = new AccessController();
routerAccess.post("/shop/signup", accessController.signUp);

export default routerAccess;
