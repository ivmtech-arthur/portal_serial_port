import { CustomResponse } from "lib/api/handler";
import { AuthorisedMiddleware, generateDisplayID } from "lib/prisma";
import CustomNextApiResponse from "lib/response";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    try {
        const { collection, ...queryParams } = req.query;
        if (typeof collection == "string") {
            await AuthorisedMiddleware(req)
            const displayID = await generateDisplayID(collection)
            CustomNextApiResponse(res, displayID, 200);
        }
        res.end()
    } catch (e) { 
        let statusCode = 400;
        let err = (e as CustomResponse)
        if (err) {
            statusCode = err.status;
        }
        CustomNextApiResponse(res, e, statusCode);
    }
}