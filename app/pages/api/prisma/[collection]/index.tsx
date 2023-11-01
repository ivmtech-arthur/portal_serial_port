import { CustomRequest, CustomResponse } from "lib/api/handler";
import { multipleEntryhandler } from "lib/api/multipleEntries";
import { singleEntryHandler } from "lib/api/singleEntry";
import { AuthorisedMiddleware, isAuthorised } from "lib/prisma";
import CustomNextApiResponse from "lib/response";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    try {
        await AuthorisedMiddleware(req)
        // const { authorization } = req.headers
        // if (authorization && authorization.includes("Bearer ")) {
        //     let tokenAuthorized = false;
        //     try {
        //         tokenAuthorized = await isAuthorised(authorization.replace("Bearer ", ""));
        //     } catch (e) {
        //         throw ("Access Denied, Bearer Token Not Found")
        //     }

        //     if (tokenAuthorized) {
        const { collection, ...queryParams } = req.query;
        const method = req.method
        const body = req.body
        let result;
        if (typeof collection == "string") {
            var customRequest: CustomRequest = {
                query: {
                    collection,
                    ...queryParams
                },
                method: req.method,
                body: body,
            }
            if (method == "POST") {
                const { data } = body
                if (Array.isArray(data)) {
                    result = await multipleEntryhandler(customRequest)
                } else {
                    result = await singleEntryHandler(customRequest)
                }
            } else {
                result = await multipleEntryhandler(customRequest)
            }

            CustomNextApiResponse(res, result, 200)
        } else {
            throw "invalid parameter"
        }

        //     }
        // } else {
        //     throw ("Access Denied, Bearer Token Not Found")
        // }
        res.end();
    } catch (e) {
        console.log("error hehe", e)
        let statusCode = 400;
        let err = (e as CustomResponse)
        if (err && err.status) {
            statusCode = err.status;
        }
        console.log("error hehe", statusCode)
        CustomNextApiResponse(res, e, statusCode);
    }
}