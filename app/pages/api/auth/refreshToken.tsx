import { PrismaClient } from '@prisma/client'
// import { jwtVerify } from 'jose'
import { createAccessToken, sendRefreshToken, createRefreshToken, verifyPrivateJWT } from 'lib/jwt'
import cookie from 'cookie'

const prisma = new PrismaClient()

export default async function refresh_token(req, res) {
    if (req.method === 'POST') {
        if (!req.headers.cookie) return res.send({ ok: false, accessToken: '' })
        const getToken = cookie.parse(req.headers.cookie)
        const refreshToken = getToken.refreshToken

        if (!refreshToken) return res.send({ ok: false, accessToken: '' })
        let payload = null

        try {
            payload = await verifyPrivateJWT(refreshToken)
            console.log("payload", payload)
            const user = await prisma.user.findUnique({
                where: {
                    userID: payload.sub,
                    // userDisplayID: payload.userDisplayID
                },
                select: {
                    userID: true,
                    username: true,
                    userDisplayID: true,
                }
            })

            if (!user) return res.send({ ok: false, accessToken: '' })
            let newPayload = {
                sub: user.userID,
                username: user.username,
                userDisplayID: user.userDisplayID
            }
            try {
                const result = await prisma.userSession.findFirst({
                    where: {
                        // userID: "SuperAdmin",
                        userID: user.userID,
                        // expiredDate: {
                        //     lt: Date()
                        // }
                    },

                });
               
                if (!result || !result.refreshToken || result.expiredDate.getTime() <= new Date().getTime()) {
                    console.log("resulta", result)
                    // sendRefreshToken(res, createRefreshToken(newPayload));
                } else {
                    console.log("resultb",result)
                    // sendRefreshToken(res, result.refreshToken);
                }

                const accessToken = await createAccessToken(newPayload)

                return res.send({ ok: true, accessToken, user });
            } catch (e) {
                throw e
            }

        } catch (e) {
            console.log("error refreshtoken", e)
            return res.send({ ok: false, accessToken: '',error: e })
        }

    } else {
        res.status(500).send()
    }
}