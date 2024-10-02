import JWT from "jsonwebtoken";
import { KeyObject } from "node:crypto";

export interface TokenPair {
  payload: {};
  privateKey: string;
  publicKey: string;
}

export class AuthUtil {
  static createTokenPair = async (tokenPair: TokenPair) => {
    try {
      // access Token

      const accessToken = await JWT.sign(
        tokenPair.payload,
        tokenPair.privateKey,
        {
          //   algorithm: "RS256",
          expiresIn: "2 days",
        }
      );

      const refreshToken = await JWT.sign(
        tokenPair.payload,
        tokenPair.privateKey,
        {
          //   algorithm: "RS256",
          expiresIn: "7 days",
        }
      );

      // verify token

      console.log("public Key: ", tokenPair.publicKey.toString());

      const decodedHeader = JWT.decode(tokenPair.publicKey, {
        complete: true,
      })?.header;

      console.log("decodedHeader", decodedHeader);

      JWT.verify(
        accessToken,
        tokenPair.publicKey,
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
