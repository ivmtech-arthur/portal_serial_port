// import { prisma } from "lib/prisma";
import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";


type selected = {
    userID: string;
    password: string;
    userTypeID: number;
    userRoleID: number;
    name: string;
    nameEn: string;
    authenticated: boolean;
    createdAt: Date;
    updatedAt: Date;
}

// var a: Prisma.UserDefaultArgs<DefaultArgs> = {
//     userID
// }
 
export const UserResultType = Prisma.validator<Prisma.MasterProductDefaultArgs>()({
    // include: { userType: true },
})

// export type Story = Prisma.UserGetPayload<{select: selected}>