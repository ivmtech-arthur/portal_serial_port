import { Machine, Prisma } from "@prisma/client";
import { isAuthorised, prisma } from "lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

interface queryParams {
    collection: String,
    id: String
}

const schemaMap = {
    "machine" : prisma.machine,
    "machinePalletDetail" : prisma.machinePalletDetail,
    "machineProductSummary" : prisma.machineProductSummary,
    "masterProduct": prisma.masterProduct,
    "profile": prisma.profile,
    "transaction": prisma.transaction,
    "user": prisma.user,
    "userSession": prisma.userSession,
    // "": prisma
}

async function PUT(req: NextApiRequest){
    const { collection,id } = req.query
    const { data } = req.body
    if( typeof collection === 'string' && typeof id === 'string'){
        // let table : any;
        switch(collection){
            case "machine":
                // Prisma.raw()
                schemaMap[collection].update({
                    where: {
                        machineID: id,
                    },
                    data: data
                })
                break
                case "machinePalletDetail":
                    schemaMap[collection].update({
                        where: {
                            palletDetailID: id,
                        },
                        data: data
                    })
                    break
                    case "machineProductSummary" :
                        schemaMap[collection].update({
                            where: {
                                summaryID: id,
                            },
                            data: data
                        })
                        break
                        case "masterProduct" : 
                        schemaMap[collection].update({
                            where: {
                                productID: id
                            },
                            data: data
                        })
        }
        
    }
    try{

    }catch(e){
        console.log("error",e);
    }
}

export default async function handler(req: NextApiRequest,res: NextApiResponse){
    try{
        const {authorization} = req.headers
        if(authorization.includes("Bearer ")){
            const tokenAuthorized = await isAuthorised(authorization.replace("Bearer ",""));
            if(tokenAuthorized){
                switch(req.method){
                    case "DELETE":
                        break;
                    case "PUT":
                        break
                    case "GET":
                        break;
                    case "DELETE":
                        break;
                }
            }
        }else{
            throw("Invalid Token")
        }
    }catch(e){
        throw e;
    }
    

}