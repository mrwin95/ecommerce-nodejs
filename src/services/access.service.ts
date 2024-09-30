"use strict";

import shopModel from "../models/shop.model";
import crypto from "node:crypto";
import { KeyTokenDto, KeyTokenService } from "./keyToken.service";
import { AuthUtil, TokenPair } from "../auth/authUtil";
import { getData, getDataInfo } from "../utils";

export interface ShopDto {
  name: string;
  email: string;
  password: string;
  roles?: ShopRole[];
}

enum ShopRole {
  Shop = "SHOP",
  Admin = "ADMIN",
  Write = "WRITER",
  Editor = "EDITOR",
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
      shopDto.roles = [ShopRole.Shop];
      const newShop = await shopModel.create(shopDto);

      if (newShop) {
        // const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
        //   modulusLength: 4096,
        // });

        const array = new Uint8Array(64);
        crypto.getRandomValues(array);

        const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
          modulusLength: 4096,
        });

        // console.log(`keys:`, { privateKey, publicKey }); //save collection KeyStore

        // convert to string format
        const privateKeyString = privateKey.export({
          type: "pkcs1",
          format: "pem",
        });

        const publicKeyString = publicKey.export({
          type: "pkcs1",
          format: "pem",
        });

        const keyToken: KeyTokenDto = {
          user: newShop._id.toString(),
          publicKey: publicKeyString.toString(),
        };
        // create token
        const publicKeyTokenString = await this.keyTokenService.createKeyToken(
          keyToken
        );

        // console.log("key", publicKeyString);

        if (!publicKeyTokenString) {
          return {
            code: "xxxx",
            message: "publicString error",
          };
        }

        const publicKeyObject = crypto
          .createPublicKey(publicKeyTokenString)
          .export({
            type: "pkcs1",
            format: "pem",
          });
        // console.log(`publicKeyObject`, publicKeyObject);

        const tokenPair: TokenPair = {
          payload: {
            userId: newShop._id.toString(),
            email: shopDto.email,
          },
          privateKey: privateKeyString.toString(),
          publicKey: publicKeyObject.toString(),
        };

        // create token pair
        const tokens = await AuthUtil.createTokenPair(tokenPair);
        console.log("created token successfully");
        // const fields: Array<keyof typeof newShop> = ["_id", "name", "email"];
        return {
          code: 201,
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
