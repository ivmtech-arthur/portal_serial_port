import { isAuthorised, prisma } from "lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

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
                }
            }
        }else{
            throw("Invalid Token")
        }
    }catch(e){
        throw e;
    }
    

}