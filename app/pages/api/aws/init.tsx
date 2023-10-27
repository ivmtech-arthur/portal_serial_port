import { CreateS3Client, globalS3Client } from "lib/aws";
import CustomNextApiResponse from "lib/response";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("handler init")
    try {
        if (!globalS3Client.s3) {
            await CreateS3Client()
        } else {
            throw "s3Client have been created"
        }

        CustomNextApiResponse(res, "ok", 200)
        // res.status(200).json({ test: "ok" })
    } catch (e) {
        CustomNextApiResponse(res, e, 400)
        // res.status(400).json({ e })
    }
}