"use strict";

import { NextFunction, Request, Response } from "express";
import { AccessService, ShopDto } from "../services/access.service";
import { Created } from "../core/success.response";

export class AccessController {
  constructor(public accessService: AccessService) {}
  signUp = async (req: any, res: any, next: any) => {
    console.log(`[p]: signUp...`, req.body);

    const shopDto: ShopDto = req.body as ShopDto;
    // new Created("", metadata: '' )
    new Created({
      message: "Shop Registered ok.!",
      metadata: await this.accessService.signUp(shopDto),
    }).send(res);
    // return res.status(201).json(await this.accessService.signUp(shopDto));
  };
}

// export default new AccessController();
