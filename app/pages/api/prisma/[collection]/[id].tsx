import { Machine, Prisma } from "@prisma/client";
import { isAuthorised, prisma, schemaMap, handleClause } from "lib/prisma";
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
                where: whereClause,
                data
            });
            res.status(200).json({
                result
            });
            return;
        }
        res.end()
    } catch (e) {
        console.log("error", e);
        res.status(400).json({
            "error": e
        })
    }
}

async function GET(req: NextApiRequest, res: NextApiResponse) {
    try {
        console.log("req.query", req.query)
        const { collection, id, populate } = req.query


        if (typeof collection === 'string' && typeof id === 'string') {
            const { whereClause, includeClause } = handleClause(collection, id, populate);
            console.log("whereClause", whereClause, includeClause)
            const result = await schemaMap[collection].findUniqueOrThrow({

                where: whereClause,
                include: includeClause
            })
            res.status(200).json({
                result
            })
            return
        }
        res.end()
    } catch (e) {
        console.log("error", e);
        res.status(400).json({
            "error": e
        })
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
            res.status(200).json({
                result
            });
            return;
        }
        res.end()
    } catch (e) {
        console.log("error", e);
        res.status(400).json({
            "error": e
        })
    }
}

async function DELETE(req: NextApiRequest, res: NextApiResponse) { 
    try {
        const { collection, id } = req.query
        const { data } = req.body
        if (typeof collection === 'string' && typeof id === 'string') {
            const { whereClause, includeClause } = handleClause(collection, id);
            const result = await schemaMap[collection].delete({
                where: whereClause,
                // include: includeClause
            });
            res.status(200).json({
                result
            });
            return;
        }
        res.end()
    } catch (e) {
        console.log("error", e);
        res.status(400).json({
            "error": e
        })
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
                        POST(req, res)
                        break;
                    case "PUT":
                        PUT(req, res)
                        break
                    case "GET":
                        GET(req, res)
                        break;
                    case "DELETE":
                        DELETE(req,res)
                        break;
                }
            }
        } else {
            throw ("Access Denied")
        }
    } catch (e) {
        let statusCode = 400;
        if (e == "Access Denied") { 
            statusCode = 403;
        }
        res.status(statusCode).json({
            error: e
        })
    }


}