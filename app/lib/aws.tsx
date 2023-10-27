import { S3Client } from '@aws-sdk/client-s3'
import { prisma } from './prisma'
import { deserialize, parse } from 'superjson'

export const globalS3Client = global as unknown as { s3: S3Client,bucket: string,schema: string };

export async function CreateS3Client() {
    try {
        
        const constant: any = await prisma.systemConstant.findFirst().then((result) => {
            return JSON.parse(result.Json)
        });
        const s3 = new S3Client({
            region: constant.region,
            credentials: {
                accessKeyId: constant.accessKeyId,
                secretAccessKey: constant.secretAccessKey
            }
        })
        globalS3Client.s3 = s3;
        globalS3Client.bucket = constant.bucket
        globalS3Client.schema = constant.schema
    } catch (e) {
        console.log("CreateClients3", e)
    }
}