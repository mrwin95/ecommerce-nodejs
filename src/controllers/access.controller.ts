"use strict";

import { AccessService, ShopDto } from "../services/access.service";
import { Created, SuccessResponse } from "../core/success.response";

export class AccessController {
  constructor(public accessService: AccessService) {}

  /**
   *
   * @param req
   * @param res
   * @param next
   */
  signIn = async (req: any, res: any, next: any) => {
    new SuccessResponse({
      metadata: await this.accessService.signIn(req.body),
    }).send(res);
  };

  /**
   *
   * @param req
   * @param res
   * @param next
   */
  signUp = async (req: any, res: any, next: any) => {
    console.log(`[p]: signUp...`, req.body);

    const shopDto: ShopDto = req.body as ShopDto;
    new Created({
      message: "Shop Registered ok.!",
      metadata: await this.accessService.signUp(shopDto),
      options: {
        limit: 10,
      },
    }).send(res);
  };
}
