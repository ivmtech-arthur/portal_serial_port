
import { isAuthorised, prisma, schemaMap, handleClause, Test } from "lib/prisma";
import { CustomRequest } from "./handler";
import { Prisma, } from "@prisma/client";
import { UserResultType } from "./type";
import { parse, serialize } from "superjson/";



async function GET<T extends CustomRequest, V extends string>(req: T, collectionName?: V): Promise<Array<Test<V>>>
async function GET(req: CustomRequest, collectionName?: string) {
    const { id, populate, collection, ...queryParams } = req.query
    try {


        let filters: string;
        const filterKeys = Object.keys(req.query).filter((key) => { return key.includes("filter") });
        if (filterKeys.length > 0) {
            // JSON.parse(filterKeys[0])
            filters = filterKeys[0];

        }
        console.log("req.query", req.query, Object.entries(req.query), new URLSearchParams(filters), typeof collection)
        if (typeof collection === 'string') {
            const { where, include, select } = handleClause(collection, id, queryParams);
            console.log("whereClause", where, include)
            const result = await schemaMap[collection].findMany({

                ...(where ? { where: where } : {}),
                ...(select ? { select: select } : {}),
                ...(include ? { include: include } : {}),
            })
            console.log("result test", result, Number.isNaN(result.weight), Number.isNaN(result.remark))
            // type ThenArg<T> = T extends PromiseLike<infer U> ? U : T
            // type dynamicReturnType = ThenArg<ReturnType<typeof result>>
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


async function POST(req: CustomRequest): Promise<Prisma.BatchPayload> {
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

async function PUT(req: CustomRequest): Promise<Prisma.BatchPayload> {
    const { collection } = req.query
    const { data, ...bodyParams } = req.body;
    try {
        if (typeof collection === 'string') {
            const { where } = handleClause(collection, null, bodyParams);
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

async function DELETE(req: CustomRequest): Promise<Prisma.BatchPayload> {
    const { collection } = req.query
    // const { where } = req.body;
    try {
        if (typeof collection === 'string') {
            const { where } = handleClause(collection, null, ...req.body);
            const result = await schemaMap[collection].deleteMany({
                where: where,
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

async function METHOD(req: CustomRequest) {
    const { collection } = req.query

}

// export async function multipleEntryhandler2(method :string,collection : string,req: CustomRequest) {
//     var result;
//     switch (req.method) {
//         case "GET":
//             return await GET(req, `${collection}`);
//             // result = a
//             // // const a = await GET(req, `${"user"}`);
//             // console.log("result xdd", a,a[0],a[0].)
//             // a.fields
//             break;
//         case "POST":
//             return await POST(req);
//             break
//         case "PUT":
//             return await PUT(req);
//             break;
//         case "DELETE":
//             return await DELETE(req);
//             break;
//         default:
//             throw ("invalid request type")
//             // res.status(200).json()
//             break;

//     }
//     // return result;

// }

export async function multipleEntryhandler(req: CustomRequest) {
    var result;
    // var { collection } = req.query
    // multipleEntryhandler2()
    switch (req.method) {
        case "GET":
            return await GET(req);
            // result = a
            // // const a = await GET(req, `${"user"}`);
            // console.log("result xdd", a,a[0],a[0].)
            // a.fields
            break;
        case "POST":
            return await POST(req);
            break
        case "PUT":
            return await PUT(req);
            break;
        case "DELETE":
            return await DELETE(req);
            break;
        default:
            throw ("invalid request type")
            // res.status(200).json()
            break;

    }
    // return result;

}

