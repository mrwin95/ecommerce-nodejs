import JWT from "jsonwebtoken";
import { KeyObject } from "node:crypto";

export interface TokenPair {
  payload: {};
  privateKey: KeyObject;
  publicKey: KeyObject;
}

export class AuthUtil {
  static createTokenPair = async (tokenPair: TokenPair) => {
    try {
      // access Token

      const accessToken = await JWT.sign(
        tokenPair.payload,
        tokenPair.privateKey,
        {
          algorithm: "RS256",
          expiresIn: "2 days",
        }
      );

      const refreshToken = await JWT.sign(
        tokenPair.payload,
        tokenPair.privateKey,
        {
          algorithm: "RS256",
          expiresIn: "7 days",
        }
      );

      // verify token

      JWT.verify(accessToken, tokenPair.publicKey, (error, decode) => {
        if (error) console.error("verify error: ", error);
        console.log(`decode: `, decode);
      });

      return { accessToken, refreshToken };
    } catch (error) {
      console.error(error);
    }
  };
}
