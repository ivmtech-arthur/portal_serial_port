import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function isAuthorised(token: string){
  try{
    const result = await prisma.userSession.findFirstOrThrow({
      where: {token: token}
    });
    if(result.expired){
      throw("Token Expired")
    }
    return true;
  }catch(e){
    console.log("error",e)
    throw(e);
  }
}