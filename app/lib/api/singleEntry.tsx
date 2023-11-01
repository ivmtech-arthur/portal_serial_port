import { Machine, Prisma } from "@prisma/client";
import { isAuthorised, prisma, schemaMap, handleClause, tableConfig, generateDisplayID } from "lib/prisma";
import CustomNextApiResponse from "lib/response";
import { includes } from "lodash";
import { NextApiResponse } from "next";
import { CustomRequest } from "./handler";
import { serialize } from "superjson";
// import superjson from "lib/superjson";
// interface populateValue : String 

async function PUT(req: CustomRequest) {
    console.log("req.query", req)
    try {
        const { collection, id } = req.query
        const { data, ...bodyParams } = req.body
        if (typeof collection === 'string') {
            const { singleWhereClause, include, select } = handleClause(collection, id, bodyParams);

            const result = await schemaMap[collection].update({
                ...singleWhereClause,
                // include: {

                // },
                ...(select ? { select: select } : {}),
                ...(include ? { include: include } : {}),
                data
            });
            result
            // CustomNextApiResponse(res, result, 200, collection);
            return result;
        }
        // res.end()
    } catch (e) {
        console.log("error", e);
        throw e;
        // CustomNextApiResponse(res, e, 400);
    }
}

async function GET(req: CustomRequest) {
    try {
        // console.log("req.query", req.query)
        const { collection, id, ...queryParams } = req.query


        if (typeof collection === 'string') {
            const { singleWhereClause, includeClause, include, select } = handleClause(collection, id, queryParams);
            console.log("singleWhereClause", singleWhereClause, includeClause)
            const result = await schemaMap[collection].findUniqueOrThrow({
                ...singleWhereClause,
                // ...includeClause
                ...(select ? { select: select } : {}),
                ...(include ? { include: include } : {}),
            })
            // CustomNextApiResponse(res, result, 200, collection);
            console.log("req.query", req.query, result)
            return serialize(result);
        }
        // res.end()
    } catch (e) {
        console.log("error", e);
        throw e;
        // CustomNextApiResponse(res, e, 400);
    }
}

async function POST(req: CustomRequest) {
    try {
        const { collection } = req.query
        const { data, ...bodyParams } = req.body
        console.log("post xd", data)
        if (typeof collection === 'string') {
            const { include, select } = handleClause(collection, null, bodyParams);
            const result = await schemaMap[collection].create({

                ...(select ? { select: select } : {}),
                ...(include ? { include: include } : {}),
                data
            });
            // CustomNextApiResponse(res, result, 200, collection);
            return result
        }
        // res.end()
    } catch (e) {
        console.log("error", e);
        throw e;
        // CustomNextApiResponse(res, e, 400);
    }
}

async function DELETE(req: CustomRequest) {
    try {
        const { collection, id } = req.query
        const { data, ...bodyParams } = req.body
        if (typeof collection === 'string') {
            const { singleWhereClause, includeClause, select, include } = handleClause(collection, id, bodyParams);
            const result = await schemaMap[collection].delete({
                ...singleWhereClause,
                ...(select ? { select: select } : {}),
                ...(include ? { include: include } : {}),
                // include: includeClause
            });
            // CustomNextApiResponse(res, result, 200, collection);
            return result;
        }
        // res.end()
    } catch (e) {
        console.log("error", e);
        throw e;
        // CustomNextApiResponse(res, e, 400);
    }
}

export async function singleEntryHandler(req: CustomRequest) {
    var result;
    switch (req.method) {
        case "POST":
            result = await POST(req)
            break;
        case "PUT":
            result = await PUT(req)
            break
        case "GET":
            result = await GET(req)
            break;
        case "DELETE":
            result = await DELETE(req)
            break;
        default:
            throw ("invalid request type")
    }
    return result;
}