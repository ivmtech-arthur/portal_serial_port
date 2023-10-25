import { S3Client } from '@aws-sdk/client-s3'
import { prisma } from './prisma'
import { deserialize,parse } from 'superjson'

export const globalS3Client = global as unknown as { s3: S3Client };

export async function CreateS3Client() {
    console.log("createS3Clientxd")
    const constant : any = await prisma.systemConstant.findFirst().then((result) => { 
        return parse(result.Json)
    });
    const s3 = new S3Client({
        region: constant.region,
        credentials: {
            accessKeyId: constant.accessKeyId,
            secretAccessKey: constant.secretAccessKey
        }
        // accessKeyId: process.env.ACCESS_KEY,
        // secretAccessKey: process.env.SECRET_ACCESS_KEY,
        // region: process.env.REGION,
    })

    globalS3Client.s3 = s3;
}

// globalS3Client.s3 = await CreateS3Client()

// export default globalS3Client

