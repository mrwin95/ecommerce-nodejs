"use strict";

import { NextFunction, Request, Response } from "express";
import { findById } from "../services/apikey.service";

const HEADER = {
  API_KEY: "x-api-key",
  AUTHORIZATION: "Authorization",
};
export const apiKey = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const key = req.headers[HEADER.API_KEY]?.toString();
    if (!key) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }

    const objKey = await findById(key);
    console.log("to here 1", objKey);
    if (!objKey) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }

    req.params.objKey = objKey.toString();
    return next();
  } catch (error) {}
};

export const permission = (permission: any) => {
  return (req: any, res: any, next: any) => {
    if (!req.params.objKey.permissions) {
      return res.status(403).json({
        message: "Permission daniel",
      });
    }

    console.log("permission", req.params.objKey.permissions);

    const validPermission = req.params.objKey.permissions.include(permission);
    if (!validPermission) {
      return res.status(403).json({
        message: "Permission daniel",
      });
    }

    return next();
  };
};

export const asyncHandle = (fn: any) => {
  return (req: any, res: any, next: any) => {
    fn(req, res, next).catch(next);
  };
};
