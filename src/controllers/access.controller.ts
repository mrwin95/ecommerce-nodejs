"use strict";

import { NextFunction, Request, Response } from "express";
import AccessService, { ShopDto } from "../services/access.service";

class AccessController {
  signUp = async (req: any, res: any, next: any) => {
    try {
      console.log(`[p]: signUp...`, req.body);

      const shopDto: ShopDto = req.body as ShopDto;
      return res.status(201).json(AccessService.signUp(shopDto));
    } catch (error) {
      console.log(error);
    }
  };
}

export default new AccessController();
