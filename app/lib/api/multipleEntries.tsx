
import { isAuthorised, prisma, schemaMap, handleClause } from "lib/prisma";
import { CustomRequest } from "./handler";

async function GET(req: CustomRequest) {
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
            // CustomNextApiResponse(res, result, 200, collection);
            return result
        }
        return
        // res.end()
    } catch (e) {
        console.log("error", e);
        throw e;
        // CustomNextApiResponse(res, e, 400, collection);
    }
}

async function POST(req: CustomRequest) {
    const { collection } = req.query
    try {

        const { data } = req.body
        if (typeof collection === 'string') {
            const result = await schemaMap[collection].createMany({
                data
            })
            // CustomNextApiResponse(res, result, 200);
            return result
        }
        // res.end()
    } catch (e) {
        console.log("error", e);
        throw e;
        // CustomNextApiResponse(res, e, 400, collection);
    }
}

async function PUT(req: CustomRequest) {
    const { collection } = req.query
    const { data, ...bodyParams } = req.body;
    try {
        if (typeof collection === 'string') {
            const { where } = handleClause(collection, null, null, bodyParams);
            const result = await schemaMap[collection].updateMany({
                where: where,
                data
            })
            // CustomNextApiResponse(res, result, 200);
            return result;
        }
        // res.end()
    } catch (e) {
        console.log("error", e.message);
        throw e;
        // CustomNextApiResponse(res, e, 400, collection);
    }
}

async function DELETE(req: CustomRequest) {
    const { collection } = req.query
    // const { where } = req.body;
    try {
        if (typeof collection === 'string') {
            const { where } = handleClause(collection, null, null, ...req.body);
            const result = await schemaMap["user"].deleteMany({
                where: where,
            })
            // CustomNextApiResponse(res, result, 200);
            return
        }
        // res.end()
    } catch (e) {
        console.log("error", e);
        throw e;
        // CustomNextApiResponse(res, e, 400, collection);
    }
}
export async function multipleEntryhandler(req: CustomRequest) {
    var result;
    switch (req.method) {
        case "GET":
            result = await GET(req);
            break;
        case "POST":
            result = await POST(req);
            break
        case "PUT":
            result = await PUT(req);
            break;
        case "DELETE":
            result = await DELETE(req);
            break;
        default:
            throw ("invalid request type")
            // res.status(200).json()
            break;

    }
    return result;

}

