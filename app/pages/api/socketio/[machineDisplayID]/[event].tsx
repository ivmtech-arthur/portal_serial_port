import { AuthorisedMiddleware, prisma } from "lib/prisma";
import CustomNextApiResponse from "lib/response";
import { IOEvent, handleIOEmit } from "lib/socketIO";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { machineDisplayID, event } = req.query;
        const { payload, action, emitOnly } = req.body
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

        let result2
        if (emitOnly) {
            result2 = handleIOEmit(result.socketID, event as string, payload, action)
        } else {
            result2 = await IOEvent(result.socketID, event as string, payload, action)
        }


        CustomNextApiResponse(res, { emitAction: event, "status": "ok", return: result2 }, 200)

    } catch (e) {
        let statusCode = 400
        if (e.statusCode) {
            statusCode = e.statusCode
        }
        CustomNextApiResponse(res, e, statusCode)
    }
}