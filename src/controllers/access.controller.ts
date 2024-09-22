"use strict";

import { NextFunction, Request, Response } from "express";

export class AccessController {
  signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(`[p]: signUp...`, req.body);

      return res.status(201).json({
        code: "2001",
        metadata: { userId: 1 },
      });
    } catch (error) {
      console.log(error);
    }
  };
}
