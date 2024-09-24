import { KeyObject } from "node:crypto";
import keyModel from "../models/keytoken.model";

export interface KeyTokenDto {
  userId: string;
  privateKey: KeyObject;
  publicKey: KeyObject;
}

export class KeyTokenService {
  createKeyToken = async (keyToken: KeyTokenDto) => {
    try {
      console.log("publicKey: ", keyToken.publicKey);
      const publicKeyString = keyToken.publicKey.toString();
      console.log("publicKeyString: ", publicKeyString);

      // create keyToken
      const tokens = await keyModel.create(keyToken);
      return tokens ? tokens.publicKey : null;
    } catch (error) {
      return error;
    }
  };
}
