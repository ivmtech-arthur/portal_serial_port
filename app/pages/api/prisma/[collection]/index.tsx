import { CustomRequest, CustomResponse } from "lib/api/handler";
import { multipleEntryhandler } from "lib/api/multipleEntries";
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
        if (typeof collection == "string") {
            var customRequest: CustomRequest = {
                query: {
                    collection,
                    ...queryParams
                },
                method: req.method,
                body: req.body,
            }
            var result = await multipleEntryhandler(customRequest)
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
        console.log("error", e)
        let statusCode = 400;
        let err = (e as CustomResponse)
        if (err) {
            statusCode = err.status;
        }
        CustomNextApiResponse(res, e, statusCode);
    }
}