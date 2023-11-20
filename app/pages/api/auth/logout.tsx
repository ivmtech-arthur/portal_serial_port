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

const getCookiesOption = (name: string) => {
    return {
        ...(name == "test" && { httpOnly: true }),
        // maxAge: 60 * 60 * 24 * 7,
        maxAge: -1,
        path: '/'
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("logout service");
    try {


        res.setHeader('Set-Cookie',
            [
                serialize('userRole', '', getCookiesOption('userRole')),
                serialize('userType', '', getCookiesOption('userRole')),
                serialize('refreshToken', '', getCookiesOption('refreshToken'))
            ])

        CustomNextApiResponse(res, {
            result: "ok"
        }, 200)

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
