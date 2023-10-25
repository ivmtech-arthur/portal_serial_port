import { CreateS3Client } from "lib/aws";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("handler init")
    try {
        await CreateS3Client()

        res.status(200).json({ test: "ok" })
    } catch (e) {
        res.status(400).json({ test: "ok" })
    }
}