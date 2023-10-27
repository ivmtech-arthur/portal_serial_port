import { generateDisplayID } from "lib/prisma";

export default async function handler(req, res) { 
    const result = await generateDisplayID("user")
    res.status(200).json({ result })
    
}