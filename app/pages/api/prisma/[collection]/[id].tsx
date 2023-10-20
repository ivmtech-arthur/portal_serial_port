import { CustomRequest } from "lib/api/handler";
import { singleEntryHandler } from "lib/api/singleEntry";
import { isAuthorised } from "lib/prisma";
import CustomNextApiResponse from "lib/response";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    try {
        const { authorization } = req.headers
        if (authorization && authorization.includes("Bearer ")) {
            const tokenAuthorized = await isAuthorised(authorization.replace("Bearer ", ""));
            if (tokenAuthorized) {
                const { collection, ...queryParams } = req.query;
                if (typeof collection == "string") {
                    var customRequest: CustomRequest = {
                        query: {
                            collection,
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

            }
        } else {
            throw ("Access Denied")
        }
        // res.end()
    } catch (e) {
        let statusCode = 400;
        if (e == "Access Denied") {
            statusCode = 403;
        }
        CustomNextApiResponse(res, e, statusCode);
    }
}