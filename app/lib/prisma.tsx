import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

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