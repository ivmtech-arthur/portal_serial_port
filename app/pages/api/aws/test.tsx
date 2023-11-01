import { NextConfig } from "next"

export default async function handler(req, res) {

    res.status(200).json(
        { a: "ok" }
    )
}

export const config = {
    api: {
        bodyParser: false,
        // bodyParser: {
        //     sizeLimit: false,
        // },
        // responseLimit: false,
    },
    // maxDuration: 5,
}