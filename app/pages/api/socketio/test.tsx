import { AuthorisedMiddleware, prisma } from "lib/prisma";
import CustomNextApiResponse from "lib/response";
import { globalSocketIOClient, handleIOEmit } from "lib/socketIO";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { machineDisplayID } = req.query;
        const { payload } = req.body
        await AuthorisedMiddleware(req)
        // const result = await prisma.machine.findUnique({
        //     where: {
        //         machineDisplayID: machineDisplayID as string,
        //     }
        // })
        var io = globalSocketIOClient.IOServer
        io.emit("local-replenishment", {
            data: [
                {
                    id: 1,
                    value: "1",
                    value2: "1",
                    value3: "1",
                    value4: "1",
                },
                {
                    id: 2,
                    value: "1",
                    value2: "1",
                    value3: "1",
                    value4: "1",
                }, {
                    id: 3,
                    value: "1",
                    value2: "1",
                    value3: "1",
                    value4: "1",
                },
                {
                    id: 4,
                    value: "1",
                    value2: "1",
                    value3: "1",
                    value4: "1",
                }
            ]
        })

        // if (!result.machineID) {
        //     throw ("machine not found")
        // }

        // if (!result.isActive) {
        //     throw ("machine is offline")
        // }

        // const result2 = handleIOEmit(result.socketID, action as string, payload)

        CustomNextApiResponse(res, { emitAction: "test", "status": "ok", return: "" }, 200)

    } catch (e) {
        let statusCode = 400
        if (e.statusCode) {
            statusCode = e.statusCode
        }
        CustomNextApiResponse(res, e, statusCode)
    }
}