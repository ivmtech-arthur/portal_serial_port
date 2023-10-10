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

function createInclude(obj, includeValue: string) {
  const tempObj = Object.assign({}, obj)
  var reservedKey = [...new Set(includeValue.split(/[.,]+/))];
  var result = iterate(tempObj, reservedKey[0], reservedKey)
  return result
}

function iterate(instance, key2, reservedKey) {
  var instance2 = instance;
  if (key2 != "include") {
    if (!reservedKey.includes(key2)) {
      return null;
    }
  }
  for (let key in instance) {
    instance2[key] = iterate(instance[key], key, reservedKey);
    if (!instance2[key]) {
      delete instance2[key]
    }
    if (key == "include" && Object.keys(instance2[key]).length == 0) {
      instance2 = true;
    }
  }
  console.log("instance end", instance2, key2)
  return instance2;
}

export function handleClause(collection, id, populate?,filters?) {
  var allPopulate = false;
  var singlePopulate = false;
  var listPopulate = false;
  var includeClause = {};
  var whereClause: any;

  if (populate && typeof populate === 'string') {
    if (populate == "*") {
      allPopulate = true;;

    } else if (populate.split(',').length > 1) {
      listPopulate = true;
    } else {
      singlePopulate = true;
    }
  }

  if (filters) { 
    console.log("filter",JSON.parse(filters));
  }

  switch (collection) {
    case "machine":
      var machineClause: Prisma.MachineWhereUniqueInput = {
        machineID: id
      }
      whereClause = machineClause;

      if (populate) {
        var machineInclude: Prisma.MachineInclude = {

        };

        includeClause = {
          ...(allPopulate ? machineInclude : {}),
          ...(listPopulate ? {
            ...(createInclude(machineInclude, populate))
          } : {}),
          ...(singlePopulate ? { ...(createInclude(machineInclude, populate)) } : {})
        }
      }
      break
    case "machinePalletDetail":
      var machinePalletDetailClause: Prisma.MachinePalletDetailWhereUniqueInput = {
        palletDetailID: id,
      }
      whereClause = machinePalletDetailClause;


      break
    case "machineProductSummary":
      var machineProductSummaryClause: Prisma.MachineProductSummaryWhereUniqueInput = {
        summaryID: id
      }
      whereClause = machineProductSummaryClause;

      if (populate) {
        var machineProductSummaryInclude: Prisma.MachineProductSummaryInclude = {

        };

        includeClause = {
          ...(allPopulate ? machineProductSummaryInclude : {}),
          ...(listPopulate ? {
            ...(createInclude(machineProductSummaryInclude, populate))
          } : {}),
          ...(singlePopulate ? { ...(createInclude(machineProductSummaryInclude, populate)) } : {})
        }
      }
      break
    case "masterProduct":
      var masterProductClause: Prisma.MasterProductWhereUniqueInput = {
        productID: id
      }
      whereClause = masterProductClause;


      if (populate) {
        var productInclude: Prisma.MasterProductInclude = {

        };

        includeClause = {
          ...(allPopulate ? productInclude : {}),
          ...(listPopulate ? {
            ...(createInclude(productInclude, populate))
          } : {}),
          ...(singlePopulate ? { ...(createInclude(productInclude, populate)) } : {})
        }
      }
      break
    case "user":
      var userClause: Prisma.UserWhereUniqueInput = {
        userID: id
      }
      whereClause = userClause

      if (populate) {
        var userInclude: Prisma.UserInclude = {
          userSession: true,
          machine: {
            include: {
              machinePalletDetail: {
                include: {
                  masterProduct: true
                }
              },
              machineProductSummary: {
                include: {
                  masterProduct: true
                }
              }
            }
          },
        };


        includeClause = {
          ...(allPopulate ? userInclude : {}),
          ...(listPopulate ? {
            ...(createInclude(userInclude, populate))
          } : {}),
          ...(singlePopulate ? { ...(createInclude(userInclude, populate)) } : {})
        }
      }
      break
    default:
      break;

  }
  return { whereClause, includeClause }
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
