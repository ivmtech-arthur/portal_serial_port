import { NextApiRequest, NextApiResponse } from "next";

import { DeleteBucketCommand, DeleteBucketCommandInput, DeleteObjectCommand, DeleteObjectCommandInput, DeleteObjectsCommand, DeleteObjectsCommandInput, ObjectIdentifier, PutObjectCommand, PutObjectCommandInput, S3Client, } from '@aws-sdk/client-s3';
import { CreateS3Client, globalS3Client } from "lib/aws";
import multer from 'multer'
import formidable, { File } from 'formidable'
import * as fs from 'fs';
// import File from 'fs'
// import { globalS3Clien}
// import { passport } from 'passport'
// import { Express } from 'express'
// const client = await CreateS3Client()

import { createRouter, expressWrapper } from "next-connect";
import cors from "cors";
import passport from "passport";
import { Blob } from "buffer";
import CustomNextApiResponse, { CustomServerResponse } from "lib/response";
import { AuthorisedMiddleware } from "lib/prisma";

export async function addFileToS3(file: formidable.File, fields) {
    const { type, collection, id } = fields
    const buffer = fs.readFileSync(file.filepath)
    var params: PutObjectCommandInput = {
        Bucket: globalS3Client.bucket,
        Key: `${globalS3Client.schema}/${type[0]}/${collection}/${id}/${file.originalFilename}`,
        Body: buffer,
        ContentType: file.mimetype,
    };
    const response = await globalS3Client.s3.send(new PutObjectCommand(params))
    fs.unlinkSync(file.filepath)
    return response
}

const router = createRouter<NextApiRequest, NextApiResponse>();
const upload = multer({
    storage: multer.diskStorage({
        destination: './public/uploads',
        filename: (req, file, cb) => cb(null, file.originalname),
    }),
});
const uploadMiddleware = upload.array('theFiles');
router
    // Use express middleware in next-connect with expressWrapper function
    // .use(expressWrapper(passport.session()))
    // A middleware example
    // .use(upload.single('file'))
    // .use(uploadMiddleware)
    .use(async (req, res, next) => {
        console.log("s3 api call", globalS3Client.s3)
        if (!globalS3Client.s3) {
            throw "s3Client have not been inistalized"
        }
        const start = Date.now();
        await next(); // call next in chain
        const end = Date.now();
        console.log(`Request took ${end - start}ms`);
    }).post(async (req, res) => {

        try {

            await AuthorisedMiddleware(req)
            var form = formidable({});
            let fields: formidable.Fields<string>
            let files: formidable.Files<string>


            [fields, files] = await form.parse(req);

            const file: formidable.File = files.file[0]
            const response = await addFileToS3(file, fields)
            console.log("fields", fields, files,)



            // return res.status(200).json({ "result": "ok" });
            CustomNextApiResponse(res, response['$metadata'], 200)
            // return res.status(200).json({ "result": response['$metadata'] });

        } catch (e) {
            console.error(e);
            throw e
        }
    }).delete(async (req, res) => {
        try {
            var form = formidable({});
            let fields: formidable.Fields<string>
            let files: formidable.Files<string>
            [fields, files] = await form.parse(req);
            const { type, collection, idWithFilenameLists } = fields
            console.log("type", type, collection, idWithFilenameLists)
            let Objects: ObjectIdentifier[] = idWithFilenameLists.map((item) => {
                return {
                    Key: `${globalS3Client.schema}/${type}/${collection}/${item}`
                }
            })
            var params: DeleteObjectsCommandInput = {
                Bucket: globalS3Client.bucket,
                Delete: {
                    Objects: Objects
                }
            }

            const response = await globalS3Client.s3.send(new DeleteObjectsCommand(params))
            // return res.status(200).json({ "result": "ok" });
            CustomNextApiResponse(res, response['$metadata'], 200)
        } catch (e) {

        }
    })

// async function uploadFileFromS3(file: Express.Multer.File, type: string) {

//     var params: PutObjectCommandInput = {
//         Bucket: this.bucket,
//         Key: `/folder/${type}/${file.originalname}`,
//         Body: file.buffer,
//         ContentType: file.mimetype,

//     };

//     try {
//         const response = await this.s3Client.send(new PutObjectCommand(params))
//         return response['$metadata'];
//     } catch (err) {
//         console.error(err);
//         throw err
//     }
// }

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

export const config = {
    api: {
        bodyParser: false
        // bodyParser: {
        //     sizeLimit: '4mb'
        // },
    },
}

export default router.handler({
    onError: (err: any, req, res) => {
        console.error(err.stack);
        let statusCode = 400
        if (err && err.statusCode) {
            statusCode = err.statusCode
        }
        CustomNextApiResponse(res, err, statusCode)
        // res.status(400).json({ err });
    },
});

// const handler = nextConnect()
//     .use(upload.single('file'))
//     .post(async (req, res) => {
//         const file = req.file;
//         const key = Date.now().toString() + '-' + file.originalname;


//         // const putParams = {
//         //     Bucket: process.env.S3_BUCKET_NAME,
//         //     Key: key,
//         //     Body: file.buffer,
//         //     ContentType: file.mimetype,
//         //     ACL: 'public-read',
//         // };

//         try {
//             console.log("req", file, globalS3Client.s3)
//             // await s3.send(new PutObjectCommand(putParams));

//             // const signedUrl = await createRequestPresigner(s3);
//             // const url = signedUrl(putParams, { expiresIn: 60 * 60 * 1000 }); // 1 hour

//             // res.status(200).json({ url });
//             res.status(200).json({ test: "test" });
//         } catch (error) {
//             console.error(error);
//             res.status(500).json({ error: 'Error uploading file to S3' });
//         }
//     });

// export default handler;

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//     console.log("req", req.body, client)
//     res.status(200).json({ name: 'John Doe' })
// }
