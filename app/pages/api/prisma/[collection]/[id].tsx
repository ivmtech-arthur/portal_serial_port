import { Machine, Prisma } from "@prisma/client";
import { isAuthorised, prisma } from "lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

interface queryParams {
    collection: String,
    id: String
}

// interface populateValue : String 

const schemaMap = {
    "machine": prisma.machine,
    "machinePalletDetail": prisma.machinePalletDetail,
    "machineProductSummary": prisma.machineProductSummary,
    "masterProduct": prisma.masterProduct,
    "profile": prisma.profile,
    "transaction": prisma.transaction,
    "user": prisma.user,
    "userSession": prisma.userSession,
    // "": prisma
}

function creatNextedObj(list: string[]) {
    const a = list.reduce((result, key) => {
        if (key.split(".").length > 1) {
            console.log(nestedObj(key));
        }
        result[key] = true
        return result
    }, {})
    return a;
}

function nestedObj(str: String) {
    let resulta = {};
    var list = str.split(".").reverse();
    resulta = list.reduce((result, item, index) => { 
        if (index == 0) { 
            result = {}
            result[item] = true;
        }
        if (index + 1 == list.length) { 
            let tempResult = Object.assign(result);
            console.log("tempReuslt finally", tempResult)
            result = {};
            result[item] = tempResult;
        }
        else { 
            let tempResult = Object.assign(result);
            console.log("tempReuslt", tempResult)
            result = {};
            result['include'] = tempResult;
            // tempResult['include'] = result;
            // result['include'] = result;
            // result = {};
            
            // result = {};
        }
        return result;
    }, {})
    // list.forEach((item, index) => {
    //     if (index + 1 == list.length) {
    //         result[item] = true;
    //     } if (index == 0) {
    //         let tempResult = {}
    //         tempResult[item] = {}
    //         result = tempResult;
    //     } else {
    //         let tempResult = {}
    //         tempResult[item] = {};
    //         result['include'] = tempResult
    //     }
    // })

    return resulta;
}

function handleClause(collection, id, populate?) {
    var populateClause;
    var allPopulate = false;
    var singlePopulate = false;
    var listPopulate = false;
    var havePopulate = false;
    var isPopulateString = typeof populate === 'string';
    var includeClause = {};
    var populateObj = {};
    var whereClause: any;

    if (populate && typeof populate === 'string') {
        if (populate == "*") {
            allPopulate = true;;

        } else if (populate.split(',').length > 1) {
            listPopulate = true;
        } else {
            singlePopulate = true;
            populateObj = nestedObj(populate);
            // populateObj = {}
            // populateObj[populate] = true;
        }
    }

    switch (collection) {
        case "machine":
            var machineClause: Prisma.MachineWhereUniqueInput = {
                machineID: id
            }
            whereClause = machineClause;

            break
        case "machinePalletDetail":
            var machinePalletDetailClause: Prisma.MachinePalletDetailWhereUniqueInput = {
                palletDetailID: id,
            }
            whereClause = machinePalletDetailClause;


            break
        case "machineProductSummary":
            var machineProductSummaryClause: Prisma.MachineProductSummaryWhereUniqueInput = {
                summaryID: id
            }
            whereClause = machineProductSummaryClause;
            break
        case "masterProduct":
            var masterProductClause: Prisma.MasterProductWhereUniqueInput = {
                productID: id
            }
            whereClause = masterProductClause;


            if (populate) {
                var productInclude: Prisma.MasterProductInclude = {};

                includeClause = {
                    ...(allPopulate ? {
                        ...(Object.keys(productInclude))
                    } : {}),
                    ...(listPopulate ? { ...(Object.keys(productInclude).filter((key) => { return !populate.includes(key) })) } : {}),
                    ...(singlePopulate ? { populate } : {})
                }
            }
            break
        case "user":
            var userClause: Prisma.UserWhereUniqueInput = {
                userID: id
            }
            whereClause = userClause

            if (populate) {
                // Object.getOwnPropertyNames(userInclude);
               
                var userInclude: Prisma.UserInclude = {
                    // userSession: {
                    //     ...(_: Prisma.UserSessionInclude = {
                    //         user
                    //     })},
                    userSession: true,
                    machine: {
                        include: {
                            MachinePalletDetail: true,
                            MachineProductSummary: true
                        }
                    },
                };

                console.log("pupulate", Object.keys(userInclude).filter((key) => { return populate.split(',').includes(key) }),
                    Object.keys(userInclude).filter((key) => { return populate.split(',').includes(key) }).reduce((result, key) => {
                        result[key] = true
                        return result
                    }, {}))
                console.log("populate", Object.keys(userInclude), includeClause, allPopulate, listPopulate, singlePopulate, populate)
                includeClause = {
                    ...(allPopulate ? {
                        ...(creatNextedObj(Object.keys(userInclude)))
                    } : {}),
                    ...(listPopulate ? {
                        ...(Object.keys(userInclude).filter((key) => { return !populate.split(',').includes(key) }).reduce((result, key) => {
                            result[key] = true
                            return result
                        }, {}))
                    } : {}),
                    ...(singlePopulate ? { ...populateObj } : {})
                }
            }
            break


        // let a : Prisma.UserWhereUniqueInput = {
        //     userID: id
        // }
        default:
            break;

    }
    return { whereClause, includeClause }
}

async function PUT(req: NextApiRequest, res: NextApiResponse) {

    try {
        const { collection, id } = req.query
        const { data } = req.body
        if (typeof collection === 'string' && typeof id === 'string') {
            // let table : any;
            // var whereClause: any;
            // var whereClause: any;
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

        // const { populate }: { populate: string } = req.query

        if (typeof collection === 'string' && typeof id === 'string') {






            const { whereClause, includeClause } = handleClause(collection, id, populate);
            console.log("whereClause", whereClause, includeClause)
        //    const result =await prisma.user.findFirst({
        //         include: {
        //             machine: {
        //                 include: {
        //                     MachinePalletDetail: true
        //                 }
        //             }
        //         }
        //     })
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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { authorization } = req.headers
        if (authorization && authorization.includes("Bearer ")) {
            const tokenAuthorized = await isAuthorised(authorization.replace("Bearer ", ""));
            if (tokenAuthorized) {
                switch (req.method) {
                    case "DELETE":
                        break;
                    case "PUT":
                        PUT(req, res)
                        break
                    case "GET":
                        GET(req, res)
                        break;
                    case "DELETE":
                        break;
                }
            }
        } else {
            throw ("Invalid Token")
        }
    } catch (e) {
        res.status(400).json({
            error: e
        })
    }


}