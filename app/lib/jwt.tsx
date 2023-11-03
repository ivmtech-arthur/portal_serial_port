import { getEnvVariable } from "./helper";
import { SignJWT, jwtVerify, importJWK, exportJWK, KeyLike, importSPKI, importPKCS8 } from "jose";
import Cookies from "js-cookie";
import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from 'cookie';
// import cookie from "cookies";



export const createAccessToken = (payload) => {
  try {
    const secret = new TextEncoder().encode(getEnvVariable("JWT_SECRET_KEY"));
    const alg = "HS256";
    return new SignJWT(payload)
      .setProtectedHeader({ alg })
      .setExpirationTime('60m')
      .setIssuedAt()
      .setSubject(payload.sub)
      .sign(secret);
  } catch (err) {
    throw err;
  }
};

export const createRefreshToken = (payload) => {
  try {
    const privateSecret = new TextEncoder().encode(getEnvVariable("JWT_PRIVATE_KEY"));
    const alg = "HS256";
    return new SignJWT(payload)
      .setProtectedHeader({ alg })
      .setExpirationTime('1y')
      .setIssuedAt()
      .setSubject(payload.sub)
      .sign(privateSecret);
  } catch (err) {
    throw err;
  }

};

export const sendRefreshToken = (res: NextApiResponse, token) => {
  res.setHeader('Set-Cookie', serialize('refreshToken', token, {
    httpOnly: true,
    // maxAge: 60 * 60 * 24 * 7,
    maxAge: 60 * 60 * 24 * 7,
    path: '/'
  }))
};


export const signJWT = async (
  payload,
  options
) => {
  try {
    const secret = new TextEncoder().encode(getEnvVariable("JWT_SECRET_KEY"));
    const alg = "HS256";
    return new SignJWT(payload)
      .setProtectedHeader({ alg })
      .setExpirationTime(options.exp)
      .setIssuedAt()
      .setSubject(payload.sub)
      .sign(secret);
  } catch (error) {
    throw error;
  }
};

export const signServerToken = async (
  payload,
  options
) => {
  try {
    const alg = "RS256";
    // compactDecrypt(getEnvVariable("JWT_PRIVATE_KEY"))
    // const privateKey = await importPKCS8(getEnvVariable("JWT_PRIVATE_KEY"), alg);
    const privateKey = await importPKCS8(getEnvVariable("JWT_PRIVATE_KEY_PKCS8"), alg)
    // const jwk = await exportJWK(new TextEncoder().encode(getEnvVariable("JWT_PRIVATE_KEY")));
    // const privateKey = await importJWK(jwk, alg) as KeyLike
    return new SignJWT(payload)
      .setProtectedHeader({ alg })
      .setExpirationTime(options.exp)
      .setIssuedAt()
      .setSubject(payload.sub)
      .sign(privateKey);
  } catch (error) {
    throw (error)
  }

}

export const verifyServerToken = async (token) => {
  const pulicKey = new TextEncoder().encode(getEnvVariable("JWT_SECRET_KEY"));
  try {
    return (
      await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET_KEY)
      )
    ).payload;
  } catch (error) {
    console.log(error);
    throw new Error("Your token has expired.");
  }
}

export const verifyPrivateJWT = async (token) => {
  try {
    return (
      await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_PRIVATE_KEY)
      )
    ).payload;
  } catch (error) {
    console.log(error);
    throw new Error("Your private token has expired.");
  }
}

export const verifyPublicJWT = async (token) => {
  try {
    return (
      await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET_KEY)
      )
    ).payload;
  } catch (error) {
    console.log(error);
    throw new Error("Your public token has expired.");
  }
}
