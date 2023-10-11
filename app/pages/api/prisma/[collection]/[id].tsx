import { Machine, Prisma } from "@prisma/client";
import { isAuthorised, prisma, schemaMap, handleClause } from "lib/prisma";
import CustomNextApiResponse from "lib/response";
import { includes } from "lodash";
import { NextApiRequest, NextApiResponse } from "next";
// interface populateValue : String 

async function PUT(req: NextApiRequest, res: NextApiResponse) {

    try {
        const { collection, id } = req.query
        const { data } = req.body
        if (typeof collection === 'string' && typeof id === 'string') {
            const { whereClause } = handleClause(collection, id);
            const result = await schemaMap[collection].update({
                ...whereClause,
                data
            });
            CustomNextApiResponse(res, result, 200,collection);
            return;
        }
        res.end()
    } catch (e) {
        console.log("error", e);
        CustomNextApiResponse(res, e, 400);
    }
}

async function GET(req: NextApiRequest, res: NextApiResponse) {
    try {
        console.log("req.query", req.query)
        const { collection, id, populate,...queryParams } = req.query


        if (typeof collection === 'string' && typeof id === 'string') {
            const { whereClause, includeClause } = handleClause(collection, id, populate, queryParams);
            console.log("whereClause", whereClause, includeClause)
            const result = await schemaMap[collection].findUniqueOrThrow({
                ...whereClause,
                ...includeClause
            })
            CustomNextApiResponse(res, result, 200, collection);
            return
        }
        res.end()
    } catch (e) {
        console.log("error", e);
        CustomNextApiResponse(res, e, 400);
    }
}

async function POST(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { collection, id } = req.query
        const { data } = req.body
        if (typeof collection === 'string' && typeof id === 'string') {
            const result = await schemaMap[collection].create({
                data
            });
            CustomNextApiResponse(res, result, 200, collection);
            return;
        }
        res.end()
    } catch (e) {
        console.log("error", e);
        CustomNextApiResponse(res, e, 400);
    }
}

async function DELETE(req: NextApiRequest, res: NextApiResponse) { 
    try {
        const { collection, id } = req.query
        const { data } = req.body
        if (typeof collection === 'string' && typeof id === 'string') {
            const { whereClause, includeClause } = handleClause(collection, id);
            const result = await schemaMap[collection].delete({
                ...whereClause,
                // include: includeClause
            });
            CustomNextApiResponse(res, result, 200, collection);
            return;
        }
        res.end()
    } catch (e) {
        console.log("error", e);
        CustomNextApiResponse(res, e, 400);
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { authorization } = req.headers
        if (authorization && authorization.includes("Bearer ")) {
            const tokenAuthorized = await isAuthorised(authorization.replace("Bearer ", ""));
            if (tokenAuthorized) {
                switch (req.method) {
                    case "POST":
                        await POST(req, res)
                        break;
                    case "PUT":
                        await PUT(req, res)
                        break
                    case "GET":
                        await GET(req, res)
                        break;
                    case "DELETE":
                        await DELETE(req,res)
                        break;
                    default:
                        throw ("invalid request type")
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