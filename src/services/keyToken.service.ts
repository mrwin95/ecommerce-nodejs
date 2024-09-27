import { KeyObject } from "node:crypto";
import keyModel from "../models/keytoken.model";

export interface KeyTokenDto {
  user: string;
  //   privateKey: string;
  publicKey: string;
}

export class KeyTokenService {
  createKeyToken = async (keyToken: KeyTokenDto): Promise<string | null> => {
    try {
      //   const publicKeyString = keyToken.publicKey.toString();

      // create keyToken
      const tokens = await keyModel.create(keyToken);
      return tokens ? tokens.publicKey : null;
    } catch (error: any) {
      return error;
    }
  };
}
