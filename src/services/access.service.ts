"use strict";

import shopModel from "../models/shop.model";
import crypto from "crypto";

export interface ShopDto {
  name: string;
  email: string;
  password: string;
  roles?: ShopRole[];
}

enum ShopRole {
  SHOP,
  ADMIN,
  WRITER,
  EDITOR,
}

class AccessService {
  signUp = async (shopDto: ShopDto) => {
    console.log(`Start signup service`);

    try {
      const holderSignup = await shopModel
        .findOne({ email: shopDto.email })
        .lean();
      if (holderSignup) {
        return {
          code: "",
          message: "shop is already registered",
        };
      }
      let salt = "f844b09ff50c";

      let hash = crypto
        .pbkdf2Sync(shopDto.password, salt, 1000, 64, "sha512")
        .toString("hex");

      //   const passwordHashed = await crypto.createHash("sha512");

      shopDto.password = hash; // passwordHashed.digest("base64");
      shopDto.roles = [ShopRole.SHOP];
      const newShop = await shopModel.create(shopDto);

      if (newShop) {
        const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
          modulusLength: 4096,
        });

        console.log(``, { privateKey, publicKey }); //save collection KeyStore
      }
    } catch (error: any) {
      return {
        code: "",
        message: error.message,
        status: "error",
      };
    }
  };
}

export default new AccessService();
