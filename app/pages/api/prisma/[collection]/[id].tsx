import { Machine, Prisma } from "@prisma/client";
import { isAuthorised, prisma, schemaMap } from "lib/prisma";
import { includes } from "lodash";
import { NextApiRequest, NextApiResponse } from "next";
// interface populateValue : String 

function createInclude(obj, includeValue: string) {
    const tempObj = Object.assign({}, obj)
    var reservedKey = [...new Set(includeValue.split(/[.,]+/))];
    // var reservedKey = [];
    // list.forEach((item) => { 
    //     if (Object.keys(obj).some((key) => { return item.includes(key) })) {
    //         if (item.split('.').length > 1) { 

    //         }
    //         // reservedKey.push(item)
    //     } else { 

    //     }
    // })
    // console.log("before", includeValue.split("."), includeValue.split(/[.,]+/), reservedKey, obj)
    var result = iterate(tempObj, reservedKey[0], reservedKey)
    // console.log("result", result, tempObj)
    return result
}

function iterate(instance, key2, reservedKey) {
    var instance2 = instance;
    // console.log("instance start", instance2, key2)
    if (key2 != "include") {
        if (!reservedKey.includes(key2)) {
            // console.log("instance is delete", instance2, instance, key2, instance[key2])
            // delete instance2[key2]; 
            return null;
        }
    }
    for (let key in instance) {
        instance2[key] = iterate(instance[key], key, reservedKey);
        // console.log("return value,", instance2[key])
        if (!instance2[key]) {
            // console.log("instance deleting", instance2, instance, key, instance2[key])
            // if (key == "include") { 

            // }
            delete instance2[key]
        }
        if (key == "include" && Object.keys(instance2[key]).length == 0) {
            instance2 = true;
        }
    }
    // if (key2 == "include" && Object.keys(instance2).length == 0) { 
    //     console.log("instance end early", instance2, key2)
    //     return true;
    // }
    console.log("instance end", instance2, key2)
    return instance2;
}

// function deleteObjRecursive(object, list: string[]) {
//     let workingKey = list[0];
//     let tempChild = object[workingKey]['include'];
//     object[workingKey] = true;
//     list.slice(0, 1)
//     if (list.length > 1) {
//         deleteObjRecursive(object, list);
//     }
//     return object;
// }

// function creatNextedObj(list: string[]) {
//     const a = list.reduce((result, key) => {
//         if (key.split(".").length > 1) {
//             console.log(nestedObj(key));
//         }
//         result[key] = true
//         return result
//     }, {})
//     console.log("nextobj", list, a)
//     return a;
// }

function nestedObj(str: String) {
    let resulta = {};
    var list = str.split(".").reverse();
    resulta = list.reduce((result, item, index) => {
        if (index == 0) {
            result = {}
            result[item] = true;
        }
        if (list.length > 1) {
            if (index + 1 == list.length) {
                let tempResult = Object.assign(result);
                // console.log("tempReuslt finally", tempResult)
                result = {};
                result[item] = tempResult;
            }
            else {
                let tempResult = Object.assign(result);
                // console.log("tempReuslt", tempResult)
                result = {};

                result['include'] = tempResult;
                // tempResult['include'] = result;
                // result['include'] = result;
                // result = {};

                // result = {};
            }
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
    var allPopulate = false;
    var singlePopulate = false;
    var listPopulate = false;
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

            if (populate) {
                var machineInclude: Prisma.MachineInclude = {

                };

                includeClause = {
                    ...(allPopulate ? machineInclude : {}),
                    ...(listPopulate ? {
                        ...(createInclude(machineInclude, populate))
                    } : {}),
                    ...(singlePopulate ? { ...(createInclude(machineInclude, populate)) } : {})
                }
            }
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

            if (populate) {
                var machineProductSummaryInclude: Prisma.MachineProductSummaryInclude = {

                };

                includeClause = {
                    ...(allPopulate ? machineProductSummaryInclude : {}),
                    ...(listPopulate ? {
                        ...(createInclude(machineProductSummaryInclude, populate))
                    } : {}),
                    ...(singlePopulate ? { ...(createInclude(machineProductSummaryInclude, populate)) } : {})
                }
            }
            break
        case "masterProduct":
            var masterProductClause: Prisma.MasterProductWhereUniqueInput = {
                productID: id
            }
            whereClause = masterProductClause;


            if (populate) {
                var productInclude: Prisma.MasterProductInclude = {

                };

                includeClause = {
                    ...(allPopulate ? productInclude : {}),
                    ...(listPopulate ? {
                        ...(createInclude(productInclude, populate))
                        // ...(Object.keys(userInclude).filter((key) => { return !populate.split(',').includes(key) }).reduce((result, key) => {
                        //     result[key] = true
                        //     return result
                        // }, {}))
                    } : {}),
                    ...(singlePopulate ? { ...(createInclude(productInclude, populate)) } : {})
                }
            }
            break
        case "user":
            var userClause: Prisma.UserWhereUniqueInput = {
                userID: id
            }
            whereClause = userClause

            if (populate) {
                var userInclude: Prisma.UserInclude = {
                    userSession: true,
                    machine: {
                        include: {
                            machinePalletDetail: {
                                include: {
                                    masterProduct: true
                                }
                            },
                            machineProductSummary: {
                                include: {
                                    masterProduct: true
                                }
                            }
                        }
                    },
                };

                // console.log("pupulate", Object.keys(userInclude).filter((key) => { return populate.split(',').includes(key) }),
                //     Object.keys(userInclude).filter((key) => { return populate.split(',').includes(key) }).reduce((result, key) => {
                //         result[key] = true
                //         return result
                //     }, {}))
                // console.log("populate", Object.keys(userInclude), includeClause, allPopulate, listPopulate, singlePopulate, populate)
                includeClause = {
                    ...(allPopulate ? userInclude : {}),
                    ...(listPopulate ? {
                        ...(createInclude(userInclude, populate))
                        // ...(Object.keys(userInclude).filter((key) => { return !populate.split(',').includes(key) }).reduce((result, key) => {
                        //     result[key] = true
                        //     return result
                        // }, {}))
                    } : {}),
                    ...(singlePopulate ? { ...(createInclude(userInclude, populate)) } : {})
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