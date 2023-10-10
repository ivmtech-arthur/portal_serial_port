import { Prisma, PrismaClient } from "@prisma/client";
// import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export const schemaMap = {
  "machine": prisma.machine,
  "machinePalletDetail": prisma.machinePalletDetail,
  "machineProductSummary": prisma.machineProductSummary,
  "masterProduct": prisma.masterProduct,
  "profile": prisma.profile,
  "transaction": prisma.transaction,
  "user": prisma.user,
  "userSession": prisma.userSession,
  // "": prisma
}

export async function isAuthorised(token: string) {
 
  try{
    const result = await prisma.userSession.findFirstOrThrow({
      where: {
        // userID: "SuperAdmin",
        token: token
      },

    });
    console.log("token", token,result.token, result.token == token);
    if(result.expiredDate.getTime() <= new Date().getTime()){
      throw("Token Expired")
    }
    return true;
  }catch(e){
    console.log("error",e)
    throw(e);
  }
}

export function getErrorResponse(e: any,collection: String) { 
  if (e instanceof Prisma.PrismaClientKnownRequestError) { 
    if (e.code === 'P2002') {
      // console.log(
      //   thro()
      // )
      throw `There is a unique constraint violation on Collection: ${collection}`;
    }
  }

}