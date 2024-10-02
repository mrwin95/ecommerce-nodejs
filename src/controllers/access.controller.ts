"use strict";

import { NextFunction, Request, Response } from "express";
import { AccessService, ShopDto } from "../services/access.service";

export class AccessController {
  constructor(public accessService: AccessService) {}
  signUp = async (req: any, res: any, next: any) => {
    console.log(`[p]: signUp...`, req.body);

    const shopDto: ShopDto = req.body as ShopDto;
    return res.status(201).json(await this.accessService.signUp(shopDto));
  };
}

// export default new AccessController();
