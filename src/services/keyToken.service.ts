import { KeyObject } from "node:crypto";
import keyModel from "../models/keytoken.model";

export interface KeyTokenDto {
  userId: string;
  privateKey?: string;
  publicKey: string;
  refreshToken?: string | undefined;
}

export class KeyTokenService {
  createKeyToken = async (userId: string, publicKey: string) => {
    try {
      const publicKeyString = publicKey.toString();
      const tokens = await keyModel.create({
        user: userId,
        publicKey: publicKeyString,
      });

      return tokens ? tokens.publicKey : null;
      //   const filter = { user: keyToken.userId };
      //   const { privateKey, publicKey, refreshToken } = keyToken;
      //   const update = {
      //     privateKey,
      //     publicKey,
      //     refreshTokensUsed: [],
      //     refreshToken,
      //   };
      //   const options = { upsert: true, new: true };
      //   const tokens = await keyModel.findOneAndUpdate(filter, update, options);
      //   return tokens ? tokens.publicKey : null;
    } catch (error: any) {
      return error;
    }
  };
}
