import { AuthorisedMiddleware, prisma } from "lib/prisma";
import CustomNextApiResponse from "lib/response";
import { handleIOEmit } from "lib/socketIO";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { machineDisplayID, action } = req.query;
        const { payload } = req.body
        await AuthorisedMiddleware(req)
        const result = await prisma.machine.findUnique({
            where: {
                machineDisplayID: machineDisplayID as string,
            }
        })

        if (!result.machineID) {
            throw ("machine not found")
        }

        if (!result.isActive) {
            throw ("machine is offline")
        }

        const result2 = handleIOEmit(result.socketID, action as string, payload)

        CustomNextApiResponse(res, { emitAction: action, "status": "ok", return: result2 }, 200)

    } catch (e) {
        let statusCode = 400
        if (e.statusCode) { 
            statusCode = e.statusCode
        }
        CustomNextApiResponse(res, e, statusCode)
    }
}