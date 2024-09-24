"use strict";

import express from "express";
import { AccessController } from "../../controllers/access.controller";
import { AccessService } from "../../services/access.service";
import { KeyTokenService } from "../../services/keyToken.service";
const routerAccess = express.Router();

const tokenService = new KeyTokenService();
const accessService = new AccessService(tokenService);
const accessController = new AccessController(accessService);

routerAccess.post("/shop/signup", accessController.signUp);

export default routerAccess;
