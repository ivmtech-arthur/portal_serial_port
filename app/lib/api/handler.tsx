import { ServerResponse } from "http";
import { multipleEntryhandler } from "./multipleEntries";
import { CustomServerResponse } from "lib/response";
import { singleEntryHandler } from "./singleEntry";

export interface CustomRequest {
    query: {
        [name: string]: string | Object
    }
    body?: any,
    method: any
}

export interface CustomResponse { 
    result?: any,
    status?: number,
    message?: string,
    error?: any
}

export async function internalAPICallHandler(req: CustomRequest,collection: string) {
    console.log("internalAPICALlhandler",req)
    return new Promise<CustomResponse>(async (resolve, reject) => {
        const { id } = req.query;
        if (!id) {
            const result = await multipleEntryhandler(req, collection);
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