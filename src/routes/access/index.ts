"use strict";

import express from "express";
import { AccessController } from "../../controllers/access.controller";
import { AccessService } from "../../services/access.service";
import { KeyTokenService } from "../../services/keyToken.service";
import { asyncHandle } from "../../auth/checkAuth";
const routerAccess = express.Router();

const tokenService = new KeyTokenService();
const accessService = new AccessService(tokenService);
const accessController = new AccessController(accessService);

routerAccess.post("/shop/signup", asyncHandle(accessController.signUp));
routerAccess.post("/shop/login", asyncHandle(accessController.signIn));

routerAccess.get("/shop/mssql-version", accessController.getMSSQLVersion);

export default routerAccess;
