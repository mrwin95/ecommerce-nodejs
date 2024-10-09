import JWT from "jsonwebtoken";
import { KeyObject } from "node:crypto";

export interface TokenPair {
  payload: {};
  privateKey: string;
  publicKey: string;
}

export class AuthUtil {
  static createTokenPair = async (
    payload: {},
    publicKey: string,
    privateKey: string
  ) => {
    try {
      // access Token

      const accessToken = await JWT.sign(payload, privateKey, {
        //   algorithm: "RS256",
        expiresIn: "2 days",
      });

      const refreshToken = await JWT.sign(payload, privateKey, {
        //   algorithm: "RS256",
        expiresIn: "7 days",
      });

      // verify token

      JWT.verify(
        accessToken,
        publicKey,
        // { algorithms: ["RS256"] },
        (error, decode) => {
          if (error) console.error("verify error: ", error);
          console.log(`decode: `, decode);
        }
      );

      return { accessToken, refreshToken };
    } catch (error) {
      console.error(error);
    }
  };
}
