import { ServerResponse } from "http";
import { multipleEntryhandler } from "./multipleEntries";
import { CustomServerResponse } from "lib/response";
import { singleEntryHandler } from "./singleEntry";

export interface CustomRequest {
    query: {
        id?: number,
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

export async function internalAPICallHandler(req: CustomRequest) {
    console.log("internalAPICALlhandler", req)
    return new Promise<CustomResponse>(async (resolve, reject) => {
        const { id, isUnique } = req.query;
        const { where } = req.query
        if (id || isUnique) {
            const result = await singleEntryHandler(req);
            resolve(CustomServerResponse(result, 200));

        } else {
            const result = await multipleEntryhandler(req);
            resolve(CustomServerResponse(result, 200));
        }
        try {

        } catch (e) {
            reject(CustomServerResponse(e, 400))
        }
    })


}