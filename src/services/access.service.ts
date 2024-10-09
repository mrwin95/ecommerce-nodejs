"use strict";

import shopModel from "../models/shop.model";
import crypto from "node:crypto";
import { KeyTokenDto, KeyTokenService } from "./keyToken.service";
import { AuthUtil, TokenPair } from "../auth/authUtil";
import { getData, getDataInfo } from "../utils";
import { BadRequest, UnAuthorized } from "../core/error.response";
import { findByEmail } from "./shop.service";
import bcrypt from "bcrypt";

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

  /**
   * 1. check email in dbs
   * 2. check password matching
   * 3. create AT, RT
   * 4. generate token
   * 5. get data, return login
   * @param req
   * @param res
   * @param next
   */
  signIn = async ({ email = "", password = "", refreshToken = undefined }) => {
    // 1.
    console.log("login");

    const foundedShop = await findByEmail({ email });
    if (!foundedShop) throw new BadRequest("Shop not found");

    // 2.
    const match = bcrypt.compare(password, foundedShop.password);
    if (!match) throw new UnAuthorized("Authorized error");

    // 3.
    // create private key
    const privateKey = crypto.randomBytes(64).toString("hex");
    const publicKey = crypto.randomBytes(64).toString("hex");

    // const tokenPair: TokenPair = {
    //   payload: {
    //     userId: foundedShop._id.toString(),
    //     email: foundedShop.email,
    //   },
    //   privateKey,
    //   publicKey,
    // };

    // create token pair
    // const tokens = await AuthUtil.createTokenPair(tokenPair);
    // const keyToken: KeyTokenDto = {
    //   userId: foundedShop._id.toString(),
    //   privateKey,
    //   publicKey,
    //   refreshToken,
    // };

    // await this.keyTokenService.createKeyToken(keyToken);
    return {
      metadata: {
        shop: foundedShop,
        // tokens,
      },
    };
  };

  signUp = async ({ name = "", email = "", password = "" }) => {
    console.log(`Start signup service`);

    const holderSignup = await shopModel.findOne({ email }).lean();
    if (holderSignup) {
      throw new BadRequest("Shop is ready registered");
    }

    const passwordHashed = await bcrypt.hash(password, 10);

    // shopDto.password = passwordHashed;
    // shopDto.roles = [ShopRole.Shop];
    const newShop = await shopModel.create({
      name,
      email,
      password: passwordHashed,
      roles: [ShopRole.Shop],
    });

    if (newShop) {
      const privateKey = crypto.randomBytes(64).toString("hex");
      const publicKey = crypto.randomBytes(64).toString("hex");

      const publicKeyString = await this.keyTokenService.createKeyToken(
        newShop._id.toString(),
        publicKey
      );
      //   const keyToken: KeyTokenDto = {
      //     userId: newShop._id.toString(),
      //     privateKey,
      //     publicKey,
      //   };
      // create token
      //   const keyStore = await this.keyTokenService.createKeyToken(keyToken);

      if (!publicKeyString) {
        return {
          code: "xxxx",
          message: "publicString error",
        };
      }

      const publicKeyObject = crypto.createPublicKey(publicKeyString).export({
        type: "pkcs1",
        format: "pem",
      });

      //   const tokenPair: TokenPair = {
      //     payload: {
      //       userId: newShop._id.toString(),
      //       email: shopDto.email,
      //     },
      //     privateKey,
      //     publicKey,
      //   };

      // create token pair
      const tokens = await AuthUtil.createTokenPair(
        { userId: newShop._id, email: email },
        publicKeyObject.toString(),
        privateKey
      );

      console.log("created token successfully");
      return {
        metadata: {
          shop: newShop,
          tokens,
        },
      };
    }
  };
}
