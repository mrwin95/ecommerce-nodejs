"use strict";

import apiKeyModel from "../models/apikey.model";
import crypto from "node:crypto";

export const findById = async (key: string): Promise<object | null> => {
  //   const newKey = await apiKeyModel.create({
  //     key: crypto.randomBytes(64).toString("hex"),
  //     permissions: ["0000"],
  //   });

  //   console.log(newKey);

  const objKey = apiKeyModel.findOne({ key, status: true }).lean();

  return objKey;
};
