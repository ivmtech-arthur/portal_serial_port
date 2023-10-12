import { ServerResponse } from "http";
import { multipleEntryhandler } from "./multipleEntries";
import { CustomServerResponse } from "lib/response";
import { singleEntryHandler } from "./singleEntry";

export interface CustomRequest {
    query: {
        [name: string]: string
    }
    body?: any,
    method: any
}

export async function internalAPICallHandler(req: CustomRequest, res: ServerResponse) {
    console.log("internalAPICALlhandler",req)
    return new Promise(async (resolve, reject) => {
        const { id } = req.query;
        if (!id) {
            const result = await multipleEntryhandler(req);
            resolve(CustomServerResponse(result, 200));
        } else { 
            const result = await singleEntryHandler(req);
            resolve(CustomServerResponse(result, 200));
        }
        try {
            
        } catch (e) {
            reject(CustomServerResponse(e, 400))
        }
    })


}