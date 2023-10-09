import { getEnvVariable, getErrorResponse } from "lib/helper";
import { prisma } from "lib/prisma";
import { signJWT } from "lib/jwt";
import { LoginUserInput, LoginUserSchema } from "lib/validations/user.schema";
import { compare } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";

export async function handler(req: NextApiRequest,res: NextApiResponse) {
  try {
    const body = (await req.body) as LoginUserInput;
    const data = LoginUserSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: { userID: data.userID },
    });

    if (!user || !(await compare(data.password, user.password))) {
      return getErrorResponse(401, "Invalid email or password");
    }

    const JWT_EXPIRES_IN = getEnvVariable("JWT_EXPIRES_IN");

    const token = await signJWT(
      { sub: user.id },
      { exp: `${JWT_EXPIRES_IN}m` }
    );

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
        token,
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

    return response;
  } catch (error: any) {
    if (error instanceof ZodError) {
      return getErrorResponse(400, "failed validations", error);
    }

    return getErrorResponse(500, error.message);
  }
}
