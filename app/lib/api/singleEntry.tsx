import { Machine, Prisma } from "@prisma/client";
import { isAuthorised, prisma, schemaMap, handleClause } from "lib/prisma";
import CustomNextApiResponse from "lib/response";
import { includes } from "lodash";
import { NextApiResponse } from "next";
import { CustomRequest } from "./handler";
// interface populateValue : String 

async function PUT(req: CustomRequest) {
    console.log("req.query", req)
    try {
        const { collection, id } = req.query
        const { data } = req.body
        if (typeof collection === 'string' && typeof id === 'string') {
            const { singleWhereClause } = handleClause(collection, id);
            const result = await schemaMap[collection].update({
                ...singleWhereClause,
                data
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

async function GET(req: CustomRequest) {
    try {
        console.log("req.query", req.query)
        const { collection, id, populate, ...queryParams } = req.query


        if (typeof collection === 'string' && typeof id === 'string') {
            const { singleWhereClause, includeClause, include, select } = handleClause(collection, id, populate, queryParams);
            console.log("singleWhereClause", singleWhereClause, includeClause)
            const result = await schemaMap[collection].findUniqueOrThrow({
                ...singleWhereClause,
                // ...includeClause
                ...(select ? { select: select } : {}),
                ...(include ? { include: include } : {}),
            })
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

async function POST(req: CustomRequest) {
    try {
        const { collection } = req.query
        const { data } = req.body
        if (typeof collection === 'string') {
            const result = await schemaMap[collection].create({
                data
            });
            // CustomNextApiResponse(res, result, 200, collection);
            return result
        }
        // res.end()
    } catch (e) {
        console.log("error", e);
        // CustomNextApiResponse(res, e, 400);
    }
}

async function DELETE(req: CustomRequest) {
    try {
        const { collection, id } = req.query
        const { data } = req.body
        if (typeof collection === 'string' && typeof id === 'string') {
            const { singleWhereClause, includeClause } = handleClause(collection, id);
            const result = await schemaMap[collection].delete({
                ...singleWhereClause,
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