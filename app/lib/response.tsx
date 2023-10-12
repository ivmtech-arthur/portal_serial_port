import { NextApiRequest, NextApiResponse } from "next";
// import { cryptoRuntime } from "jose";
import { JWK } from 'jose'
import { randomUUID } from "crypto";
import { Prisma } from "@prisma/client";
import { getErrorMessage } from "./prisma";
import { ServerResponse } from "http";
export default function CustomNextApiResponse(res: NextApiResponse,result: any,statusCode: number,collection?: any) { 
    // let result: NextApiResponse;
    let resultObj = {};
    const nonce = Buffer.from(randomUUID()).toString('base64')
    const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
    style-src 'self' 'nonce-${nonce}';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
`

    // const requestHeaders = new Headers(request.headers)
    // requestHeaders.set('x-nonce', nonce)
    // requestHeaders.set(
    //     'Content-Security-Policy',
    //     // Replace newline characters and spaces
    //     cspHeader.replace(/\s{2,}/g, ' ').trim()
    // )
    res.setHeader("Content-Security-Policy", cspHeader.replace(/\s{2,}/g, ' ').trim());
    let message;
    if (statusCode == 200) {
        message = "Success";
        resultObj = {
            result,
            status: statusCode,
            message: message,
        }
    } else { 
        if (result instanceof Prisma.PrismaClientKnownRequestError) { 
            message = getErrorMessage(result.code, collection) || result.message
        }
        if (result instanceof Prisma.PrismaClientValidationError) { 
            message = result.message
        }
        resultObj = {
            error: result,
            status: statusCode,
            message: message
        }
    }
    res.status(statusCode).json({
        ...resultObj
    })
}

export function CustomServerResponse(result: any, statusCode: number, collection?: any) { 
    let message;
    let resultObj = {};
    if (statusCode == 200) {
        message = "Success";
        resultObj = {
            result,
            status: statusCode,
            message: message,
        }
    } else {
        if (result instanceof Prisma.PrismaClientKnownRequestError) {
            message = getErrorMessage(result.code, collection) || result.message
        }
        if (result instanceof Prisma.PrismaClientValidationError) {
            message = result.message
        }
        resultObj = {
            error: result,
            status: statusCode,
            message: message
        }
    }
    return resultObj;
}