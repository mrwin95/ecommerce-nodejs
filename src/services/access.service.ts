"use strict";

import shopModel from "../models/shop.model";
import crypto from "node:crypto";
import { KeyTokenDto, KeyTokenService } from "./keyToken.service";
import { AuthUtil, TokenPair } from "../auth/authUtil";

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

export class AccessService {
  constructor(public keyTokenService: KeyTokenService) {}
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
        // const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
        //   modulusLength: 4096,
        // });

        const array = new Uint8Array(64);
        crypto.getRandomValues(array);
        // convert to hexdecimal

        // const hexString =

        // const privateKey = Array.from(array)
        //   .map((byte) => byte.toString(16).padStart(2, "0"))
        //   .join("");
        // const publicKey = Array.from(array)
        //   .map((byte) => byte.toString(16).padStart(2, "0"))
        //   .join("");

        const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
          modulusLength: 4096,
        });

        console.log(`keys:`, { privateKey, publicKey }); //save collection KeyStore

        const keyToken: KeyTokenDto = {
          userId: newShop._id.toString(),
          privateKey,
          publicKey,
        };
        // create token
        const keyStore = await this.keyTokenService.createKeyToken(keyToken);

        if (!keyStore) {
          return {
            code: "xxxx",
            message: "publicString error",
          };
        }

        // console.log("publicKeyString: ", publicKeyString);
        // const publicKeyObject = crypto.createPublicKey(publicKey);
        const tokenPair: TokenPair = {
          payload: {
            userId: newShop._id.toString(),
            email: shopDto.email,
          },
          privateKey,
          publicKey,
        };
        const tokens = await AuthUtil.createTokenPair(tokenPair);
        console.log("created token sucessfully");
        return {
          code: 202,
          metadata: {
            shop: newShop,
            tokens,
          },
        };
      }

      return {
        code: 200,
        metadata: null,
      };
    } catch (error: any) {
      return {
        code: "",
        message: error.message,
        status: "error",
      };
    }
  };
}

// export default new AccessService();
