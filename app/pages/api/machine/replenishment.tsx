

import { AuthorisedMiddleware, generateDisplayID, prisma } from "lib/prisma";
import { ZodError } from "zod";
import { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";
import CustomNextApiResponse from "lib/response";
import { CreateMachineInput, CreateMachineSchema } from "lib/validations/machine.schema";
import { signServerToken } from "lib/jwt";
import formidable from "formidable";
import { addFileToS3, removeFileFromS3 } from "../aws/s3";
import { parse } from "superjson";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { ObjectIdentifier } from "@aws-sdk/client-s3";
import { globalS3Client } from "lib/aws";

// export const config = {
//     api: {
//         bodyParser: false
//     },
// }

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("replenishment machine service");
    try {
        await AuthorisedMiddleware(req)

        const { machineQuery, replenishmentQuery }: {
            machineQuery: Prisma.MachineUpdateArgs,
            replenishmentQuery: Prisma.ReplenishmentCreateArgs
        } = req.body
        const { machinePalletDetail, ...restInclude } = machineQuery.include
        const { include } = machinePalletDetail as Prisma.Machine$machinePalletDetailArgs<DefaultArgs>
        console.log("replenishment machine service", machineQuery.data.machinePalletDetail, include,);

        await prisma.replenishment.create({
            data: replenishmentQuery.data
        })

        const machine = await prisma.machine.update({
            where: machineQuery.where,
            include: {
                machinePalletDetail: {
                    include
                },
                replenishment: true,
                ...restInclude
            },
            data: machineQuery.data,
        })



        let count = 0

        CustomNextApiResponse(res, { machine }, 200)
        // CustomNextApiResponse(res, { test: "ok" }, 200)

        res.end();
    } catch (error: any) {
        let statusCode = 400

        if (error && error.statusCode) {
            statusCode = error.statusCode
        }
        console.log("error:", error);
        CustomNextApiResponse(res, error, statusCode)
    }
}



