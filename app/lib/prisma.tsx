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

function getObjectFromKeyPath(keyPathObj: {}) {
  // kayPath: string, value: any
  let result = {}
  let listinstance = [];
  for (var keyPath in keyPathObj) {
    let value = keyPathObj[keyPath]
    let keys = keyPath.match(/[^[\]]+/g);
    let prop = keys.pop();
   
    if (/^[0-9]*$/.test(prop)) {
      let acc = result;
      for (let key of keys) {
        acc = (acc[key] = acc[key] || []);
      }
      if (Array.isArray(acc)) { 
        acc.push(value);
      }
      // acc = []
    } else { 
      let acc = result;
      for (let key of keys) {
        acc = (acc[key] = acc[key] || {});
      }
      acc[prop] = keyPath.endsWith("[]")
        ? (acc[prop] || []).concat(value)
        : value;
    }
    
  }


  return result;
}

export function handleClause(collection, id?, populate?, queryParams?) {
  var allPopulate = false;
  var singlePopulate = false;
  var listPopulate = false;
  var includeInput = {};
  var whereInput: any;
  var queryParamsObject: any;

  if (populate && typeof populate === 'string') {
    if (populate == "*") {
      allPopulate = true;

    } else if (populate.split(',').length > 1) {
      listPopulate = true;
    } else {
      singlePopulate = true;
    }
  }

  if (queryParams) {
    queryParamsObject = getObjectFromKeyPath(queryParams);
    console.log("filter", queryParamsObject);
  }

  switch (collection) {
    case "machine":
      var machineClause: Prisma.MachineWhereUniqueInput = {
        machineID: id
      }
      whereInput = machineClause;

      if (populate) {
        var machineInclude: Prisma.MachineInclude = {

        };

        includeInput = {
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
      whereInput = machinePalletDetailClause;


      break
    case "machineProductSummary":
      var machineProductSummaryClause: Prisma.MachineProductSummaryWhereUniqueInput = {
        summaryID: id
      }
      whereInput = machineProductSummaryClause;

      if (populate) {
        var machineProductSummaryInclude: Prisma.MachineProductSummaryInclude = {

        };

        includeInput = {
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
      whereInput = masterProductClause;


      if (populate) {
        var productInclude: Prisma.MasterProductInclude = {

        };

        includeInput = {
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
      whereInput = userClause

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


        includeInput = {
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
  return { whereClause: { where: whereInput }, includeClause: { include: includeInput }, ...queryParamsObject }
}

export async function isAuthorised(token: string) {

  try {
    const result = await prisma.userSession.findFirstOrThrow({
      where: {
        // userID: "SuperAdmin",
        token: token
      },

    });
    console.log("token", token, result.token, result.token == token);
    if (result.expiredDate.getTime() <= new Date().getTime()) {
      throw ("Token Expired")
    }
    return true;
  } catch (e) {
    console.log("error", e)
    throw (e);
  }
}

export function getErrorMessage(code: string, collection: String) {
  switch (code) { 
    case "P2002":
      return `There is a unique constraint violation on Collection: ${collection}`;
    case "":
    default:
      break;
    
  }
}
