import { isAuthorised, prisma, schemaMap, handleClause } from "lib/prisma";
import CustomNextApiResponse from "lib/response";
import { NextApiRequest, NextApiResponse } from "next";

async function GET(req: NextApiRequest, res: NextApiResponse) {
    const { collection, id, populate, ...queryParams } = req.query
    try {


        let filters: string;
        const filterKeys = Object.keys(req.query).filter((key) => { return key.includes("filter") });
        if (filterKeys.length > 0) {
            // JSON.parse(filterKeys[0])
            filters = filterKeys[0];

        }
        console.log("req.query", req.query, Object.entries(req.query), new URLSearchParams(filters))
        if (typeof collection === 'string') {
            const { where, include } = handleClause(collection, id, populate, queryParams);
            console.log("whereClause", where, include)
            const result = await schemaMap[collection].findMany({

                where: where,
                include: include
            })
            CustomNextApiResponse(res, result, 200, collection);
            return
        }
        res.end()
    } catch (e) {
        console.log("error", e);
        CustomNextApiResponse(res, e, 400, collection);
    }
}

async function POST(req: NextApiRequest, res: NextApiResponse) {
    const { collection } = req.query
    try {

        const { data } = req.body
        if (typeof collection === 'string') {
            const result = await schemaMap[collection].createMany({
                data
            })
            CustomNextApiResponse(res, result, 200);
            return
        }
        res.end()
    } catch (e) {
        console.log("error", e);
        CustomNextApiResponse(res, e, 400, collection);
    }
}

async function PUT(req: NextApiRequest, res: NextApiResponse) {
    const { collection } = req.query
    const { data, ...bodyParams } = req.body;
    try {
        if (typeof collection === 'string') {
            const { where } = handleClause(collection, null, null, bodyParams);
            const result = await schemaMap[collection].updateMany({
                where: where,
                data
            })
            CustomNextApiResponse(res, result, 200);
            return
        }
        res.end()
    } catch (e) {
        console.log("error", e.message);
        CustomNextApiResponse(res, e, 400, collection);
    }
}

async function DELETE(req: NextApiRequest, res: NextApiResponse) {
    const { collection } = req.query
    // const { where } = req.body;
    try {
        if (typeof collection === 'string') {
            const { where } = handleClause(collection, null, null, ...req.body);
            const result = await schemaMap["user"].deleteMany({
                where: where,
            })
            CustomNextApiResponse(res, result, 200);
            return
        }
        res.end()
    } catch (e) {
        console.log("error", e);
        CustomNextApiResponse(res, e, 400, collection);
    }
}
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { authorization } = req.headers
        if (authorization && authorization.includes("Bearer ")) {
            const tokenAuthorized = await isAuthorised(authorization.replace("Bearer ", ""));
            if (tokenAuthorized) {
                switch (req.method) {
                    case "GET":
                        await GET(req, res);
                        break;
                    case "POST":
                        await POST(req, res);
                        break
                    case "PUT":
                        await PUT(req, res);
                        break;
                    case "DELETE":
                        await DELETE(req, res);
                        break;
                    default:
                        throw ("invalid request type")
                        // res.status(200).json()
                        break;

                }
            }
        } else {
            throw ("Access Denied")
        }
    } catch (e) {
        console.log("error",e)
        let statusCode = 400;
        if (e == "Access Denied") {
            statusCode = 403;
        }
        CustomNextApiResponse(res, e, statusCode);
    }


}