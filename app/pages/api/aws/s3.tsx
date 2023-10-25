import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from 'next-connect';
import { DeleteBucketCommand, DeleteBucketCommandInput, DeleteObjectCommand, DeleteObjectCommandInput, DeleteObjectsCommand, DeleteObjectsCommandInput, ObjectIdentifier, PutObjectCommand, PutObjectCommandInput, S3Client, } from '@aws-sdk/client-s3';
import { CreateS3Client, globalS3Client } from "lib/aws";
import multer from 'multer'
// import { Express } from 'express'
const client = await CreateS3Client()

async function uploadFileFromS3(file: Express.Multer.File, type: string) {

    var params: PutObjectCommandInput = {
        Bucket: this.bucket,
        Key: `/folder/${type}/${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,

    };

    try {
        const response = await this.s3Client.send(new PutObjectCommand(params))
        return response['$metadata'];
    } catch (err) {
        console.error(err);
        throw err
    }
}

async function removeFileFromS3(keyList: ObjectIdentifier[]) {

    var bucketParams: DeleteObjectsCommandInput = {
        Bucket: this.bucket,
        Delete: {
            Objects: keyList
        }
    };
    try {
        const data = await this.s3Client.send(new DeleteObjectsCommand(bucketParams))
        return data['$metadata'];
    } catch (err) {
        console.error(err);
        throw err
    }

}

const upload = multer();

const handler = nextConnect()
    .use(upload.single('file'))
    .post(async (req, res) => {
        const file = req.file;
        const key = Date.now().toString() + '-' + file.originalname;

        console.log("req", file, globalS3Client.s3)
        const putParams = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: 'public-read',
        };

        try {
            // await s3.send(new PutObjectCommand(putParams));

            // const signedUrl = await createRequestPresigner(s3);
            // const url = signedUrl(putParams, { expiresIn: 60 * 60 * 1000 }); // 1 hour

            // res.status(200).json({ url });
            res.status(200).json({ test: "test" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error uploading file to S3' });
        }
    });

export default handler;

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//     console.log("req", req.body, client)
//     res.status(200).json({ name: 'John Doe' })
// }
