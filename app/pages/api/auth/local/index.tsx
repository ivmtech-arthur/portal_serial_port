import { getEnvVariable, getErrorResponse } from "lib/helper";
import { prisma } from "lib/prisma";
import { signJWT } from "lib/jwt";
import { LoginUserInput, LoginUserSchema } from "lib/validations/user.schema";
import { compare } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";
import CustomNextApiResponse from "lib/response";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("login service");
  try {
    const body = (await req.body) as LoginUserInput;
    const data = LoginUserSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: { userID: data.identifier },
      include: {
        profile: true,
        userSession: true
      }
    });

    console.log("user ",user)

    if (!user || !(await compare(data.password, user.password))) {
      // return getErrorResponse(401, "Invalid email or password");
      
      res.status(401).json({
        "error": "Invalid email or password"
      })
      return;
    }

    if (!user.authenticated) { 
      res.status(403).json({
        "error": "user not Authorized"
      })
    }

    const JWT_EXPIRES_IN = getEnvVariable("JWT_EXPIRES_IN");

    const token = await signJWT(
      { sub: user.userID },
      { exp: `${JWT_EXPIRES_IN}m` }
    );

    if (user.userSession) {
      let expireDate = new Date();
      expireDate.setFullYear(expireDate.getFullYear() + 1);
      await prisma.userSession.update({
        where: {
          userID: user.userID
        },
        data: {
          token,
          expiredDate: expireDate,
        }
      })
    } else { 
      let expireDate = new Date();
      expireDate.setFullYear(expireDate.getFullYear() + 1);
      await prisma.userSession.create({
        data: {
          userID: user.userID,
          token: token,
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
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV !== "development",
      maxAge: tokenMaxAge,
    };

    const response = res.status(200).json(
      JSON.stringify({
        status: "success",
        jwt: token,
        user
      }),
    );

    // await Promise.all([
    //   response.cookies.set(cookieOptions),
    //   response.cookies.set({
    //     name: "logged-in",
    //     value: "true",
    //     maxAge: tokenMaxAge,
    //   }),
    // ]);

    res.end();
  } catch (error: any) {
    let message = "";
    // if (error instanceof ZodError) {
    //   message = error.
    //   return 
    //   // return getErrorResponse(400, "failed validations", error);
    // }
    console.log("error:", error);
    CustomNextApiResponse(res,error,400,"")
    res.status(400).json(error);
    // return getErrorResponse(500, error.message);
  }
}
