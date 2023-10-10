import { isAuthorised, prisma, schemaMap,handleClause } from "lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

async function GET(req: NextApiRequest,res: NextApiResponse) { 
    try {
        console.log("req.query", req.query)
        const { collection, id, populate,filters } = req.query
        if (typeof collection === 'string' && typeof id === 'string') {
            const { whereClause, includeClause } = handleClause(collection, id, populate,filters);
            console.log("whereClause", whereClause, includeClause)
            const result = await schemaMap["user"].findMany({

                where: {
                    userID: {
                        // in
                    }
                },
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

export default async function handler(req: NextApiRequest,res: NextApiResponse){
    try{
        const {authorization} = req.headers
        if(authorization.includes("Bearer ")){
            const tokenAuthorized = await isAuthorised(authorization.replace("Bearer ",""));
            if(tokenAuthorized){
                switch(req.method){
                    case "GET":
                        break;
                    case "POST":
                        break
                    case "PUT":
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