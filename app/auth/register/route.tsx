
import { generatePassword, getErrorResponse } from "lib/helper";
import { prisma } from "lib/prisma";
import {
    RegisterUserInput,
    RegisterUserSchema,
} from "lib/validations/user.schema";
import { hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { NextApiRequest,NextApiResponse } from "next";

type ResponseData = {
    body: any
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    res.status(200).json({ body: 'John Doe' })
    // console.log("register service");
    // try {
    //     const body = (await req.body) as RegisterUserInput;
    //     const data = RegisterUserSchema.parse(body);

    //     const password = generatePassword(2);

    //     const hashedPassword = await hash(data.password, 12);

    //     const user = await prisma.user.create({
    //         data: {
    //             name: data.name,
    //             nameEn: data.nameEn,
    //             password: hashedPassword,
    //             userRole: "",
    //             userID: data.userID,
    //             // photo: data.photo,
    //         },
    //     });
    //     //   await prisma.user.create({
    //     //       data: {
    //     //           name: "",
    //     //       }
    //     //   })
    //      res.status(200).json(
    //          {
    //              body: JSON.stringify({
    //                  status: "success",
    //                  data: { user: { ...user, password: undefined } },
    //              }),
    //          }
    //             // {
    //             //     status: 201,
    //             //     headers: { "Content-Type": "application/json" },
    //             // }
    //     );
    //     // return res.body(
    //     //     JSON.stringify({
    //     //         status: "success",
    //     //         data: { user: { ...user, password: undefined } },
    //     //     }),
    //     //     {
    //     //         status: 201,
    //     //         headers: { "Content-Type": "application/json" },
    //     //     }
    //     // );
    //     res.end();
    // } catch (error: any) {
    //     if (error instanceof ZodError) {
    //         // return getErrorResponse(400, "failed validations", error);
    //     }

    //     if (error.code === "P2002") {
    //         // return getErrorResponse(409, "user with that name already exists");
    //     }
    //     res.status(400).json(error);
    //     // return getErrorResponse(500, error.message);
    //     console.log("error:", error);
    //     next();
    // }
    // res.status(400).json({body:"xd"});
    // next();
}



