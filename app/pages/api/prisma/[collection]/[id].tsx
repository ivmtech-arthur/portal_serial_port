import { CustomRequest, CustomResponse } from "lib/api/handler";
import { singleEntryHandler } from "lib/api/singleEntry";
import { AuthorisedMiddleware, isAuthorised } from "lib/prisma";
import CustomNextApiResponse from "lib/response";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    try {
        await AuthorisedMiddleware(req)
        // const { authorization } = req.headers
        // if (authorization && authorization.includes("Bearer ")) {
        //     const tokenAuthorized = await isAuthorised(authorization.replace("Bearer ", ""));
        //     if (tokenAuthorized) {
        const { collection, id, ...queryParams } = req.query;
        if (typeof collection == "string" && typeof id == "string") {
            var customRequest: CustomRequest = {
                query: {
                    collection,
                    id: parseInt(id),
                    ...queryParams
                },
                method: req.method,
                body: req.body
            }
            var result = await singleEntryHandler(customRequest)
            CustomNextApiResponse(res, result, 200)
        }
        else {
            throw "invalid parameter"
        }

        //     }
        // } else {
        //     throw ("Access Denied")
        // }
        // res.end()
    } catch (e) {
        let statusCode = 400;
        let err = (e as CustomResponse)
        if (err) {
            statusCode = err.status;
        }
        CustomNextApiResponse(res, e, statusCode);
    }
}