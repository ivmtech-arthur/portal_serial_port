import { getEnvVariable, getErrorResponse } from "lib/helper";
import { prisma } from "lib/prisma";
import { createAccessToken, createRefreshToken, sendRefreshToken, signJWT } from "lib/jwt";
import { LoginUserInput, LoginUserSchema } from "lib/validations/user.schema";
import { compare } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";
import CustomNextApiResponse from "lib/response";
import { serialize } from 'cookie';

const getCookiesOption = (name: string, rememberMe: boolean) => {
  return {
    ...(name == "refreshToken" && { httpOnly: true }),
    // maxAge: 60 * 60 * 24 * 7,
    ...(rememberMe && { maxAge: 60 * 60 * 24 * 365 }),
    path: '/'
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("login service");
  try {
    const body = (await req.body) as LoginUserInput;
    const data = LoginUserSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: { username: data.identifier },
      include: {
        profile: true,
        userSession: true,
        userRole: true,
        userType: true,
      }
    });

    console.log("user ", user)

    if (!user || !(await compare(data.password, user.password))) {
      // return getErrorResponse(401, "Invalid email or password");
      CustomNextApiResponse(res, {
        "error": "Invalid email or password"
      }, 401)
      // res.status(401).json({
      //   "error": "Invalid email or password"
      // })
      return;
    }

    if (!user.authenticated) {
      CustomNextApiResponse(res, {
        "error": "user not Authorized"
      }, 403)
      // res.status(403).json({
      //   "error": "user not Authorized"
      // })
    }

    const JWT_EXPIRES_IN = getEnvVariable("JWT_EXPIRES_IN");

    let payload = {
      sub: user.userID,
      username: user.username,
      userDisplayID: user.userDisplayID
    }
    const refreshToken = await createRefreshToken(
      payload
    );

    // sendRefreshToken(res, refreshToken)



    res.setHeader('Set-Cookie',
      [
        serialize('userRole', user.userRole.userRoleName, getCookiesOption('userRole', data.rememberMe)),
        serialize('userType', user.userType.userTypeName, getCookiesOption('userRole', data.rememberMe)),
        serialize('refreshToken', refreshToken, getCookiesOption('refreshToken', data.rememberMe))
      ])


    const accessToken = await createAccessToken(payload)
    if (user.userSession) {
      let expireDate = new Date();
      // expireDate.setFullYear(expireDate.getFullYear() + 1);
      expireDate.setMinutes(expireDate.getMinutes() + 1)
      await prisma.userSession.update({
        where: {
          userID: user.userID
        },
        data: {
          refreshToken,
          expiredDate: expireDate,
        }
      })
    } else {
      let expireDate = new Date();
      // expireDate.setFullYear(expireDate.getFullYear() + 1);
      expireDate.setMinutes(expireDate.getMinutes() + 1)
      await prisma.userSession.create({
        data: {
          userID: user.userID,
          refreshToken,
          expiredDate: expireDate,

        }
      })
    }

    delete user.userSession

    // await prisma.userSession.findFirst({
    //   where:
    //     userID: {
    //       user.userID
    //     }
    // })

    const tokenMaxAge = parseInt(JWT_EXPIRES_IN) * 60;
    const cookieOptions = {
      name: "token",
      value: refreshToken,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV !== "development",
      maxAge: tokenMaxAge,
    };

    CustomNextApiResponse(res, {
      refreshToken: refreshToken,
      accessToken: accessToken,
      user
    }, 200)
    // await Promise.all([
    //   response.cookies.set(cookieOptions),
    //   response.cookies.set({
    //     name: "logged-in",
    //     value: "true",
    //     maxAge: tokenMaxAge,
    //   }),
    // ]);

    // res.();
  } catch (error: any) {
    let message = "";
    // if (error instanceof ZodError) {
    //   message = error.
    //   return 
    //   // return getErrorResponse(400, "failed validations", error);
    // }
    console.log("error:", error);
    CustomNextApiResponse(res, error, 400)
    // res.status(400).json(error);
    // return getErrorResponse(500, error.message);
  }
}
