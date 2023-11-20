import { Prisma, PrismaClient, User } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { NextApiRequest } from "next";
import { CustomServerResponse } from "./response";
import { verifyPublicJWT } from "./jwt";
import machineType from "pages/[lang]/machine-management/machine-Type";
// import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

const idLimit = 10;

export const tableConfig = {
  "machine": {
    instance: prisma.machine,
    prefix: "MAC",
  },
  "machineType": {
    instance: prisma.machineType
  },
  "machinePalletDetail": {
    instance: prisma.machinePalletDetail,
    prefix: "MPD",
  },
  "machineProductSummary": {
    instance: prisma.machineProductSummary,
    prefix: "MPS",
  },
  "masterProduct": {
    instance: prisma.masterProduct,
    prefix: "PRD",
  },
  "profile": {
    instance: prisma.profile,
    prefix: "PRF",
  },
  "transaction": {
    instance: prisma.transaction,
    prefix: "TRN",
  },
  "user": {
    instance: prisma.user,
    prefix: "USR",
  },
  "userSession": {
    instance: prisma.userSession,
  },
  "userRole": {
    instance: prisma.userRole,
  },
  "userType": {
    instance: prisma.userType,
  },
  "attachment": {
    instance: prisma.attachment,
    prefix: "ATT",
  },
  "autoIncrement": {
    instance: prisma.autoIncrement,
  },


}

function genSchemaMap() {
  var result = {}
  const keys = Object.keys(tableConfig)
  Object.values(tableConfig).forEach((value, index) => {

    result[keys[index]] = value.instance
  })
  // for (const collection in tableConfig) { 
  //   result[collection] = tableConfig[collection].instance
  // }

  return result
}

export const schemaMap = genSchemaMap()

// export const schemaMap = {
//   "machine": prisma.machine,
//   "machinePalletDetail": prisma.machinePalletDetail,
//   "machineProductSummary": prisma.machineProductSummary,
//   "masterProduct": prisma.masterProduct,
//   "profile": prisma.profile,
//   "transaction": prisma.transaction,
//   "user": prisma.user,
//   "userSession": prisma.userSession,
//   "userRole": prisma.userRole,
//   "userType": prisma.userType,
//   "attachment": prisma.attachment,
//   "autoIncrement": prisma.autoIncrement,
//   // "": prisma
// }

type UserReponseType = Prisma.UserGetPayload<{
  include: {
    [name: string]: true | {
      [name: string]: true | {
        [name: string]: true
      }
    }
  }
}>

type UserSessionReponseType = Prisma.UserSessionGetPayload<{
  include: {
    user: true,
    // userSession: true,
    // machine: {
    //   include: {
    //     [name: string]: true
    //     // machinePalletDetail: true,
    //   }
    // };
  }
}>

// const usersWithCars = await prisma.user.findMany({
//   include: {
//     cars: true,
//   }
// });

// ["machine", "machinePalletDetail", "machineProductSummary", "masterProduct", "profile", "transaction", "user", "userSession"].filter((table) => {
//   return table
// })
// var a: User = {};
export type Test<W> =
  W extends "machine" ? typeof prisma.machine.fields
  : W extends "machinePalletDetail" ? typeof prisma.machinePalletDetail.fields
  : W extends "machineProductSummary" ? typeof prisma.machineProductSummary.fields
  : W extends "masterProduct" ? typeof prisma.masterProduct.fields
  : W extends "profile" ? typeof prisma.profile.fields
  : W extends "transaction" ? typeof prisma.transaction.fields
  : W extends "user" ? UserReponseType
  : W extends "userSession" ? UserSessionReponseType : any;

// export type Test2<W> = 
//   W extends "machine" ? typeof prisma.machine.fields
//   : W extends "machinePalletDetail" ? typeof prisma.machinePalletDetail.fields
//   : W extends "machineProductSummary" ? typeof prisma.machineProductSummary.fields
//   : W extends "masterProduct" ? typeof prisma.masterProduct.fields
//   : W extends "profile" ? typeof prisma.profile.fields
//   : W extends "transaction" ? typeof prisma.transaction.fields
//   : W extends "user" ? Prisma.UserCreate
//   : W extends "userSession" ? UserSessionReponseType : W;


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
  console.log("getObjectFromKeyPath", keyPathObj)
  // console.log("result llop", value, keys, prop)
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
        : value == "true" ? true : value;
    }

  }


  return result;
}

export async function getRecordFromDisplayID(displayID, collection) {
  // schemaMap[collection].
  let where = {}
  where[`${collection}DisplayID`] = displayID
  return await schemaMap[collection].findUnique({
    where
  })
}


export const generateDisplayID = async (collection: string) => {
  const value = await getAutoIncrement(collection)

  if (tableConfig[collection].prefix) {
    return tableConfig[collection].prefix + (value + "").padStart(idLimit, "0");
  }
  else {
    return ""
  }

}

async function getAutoIncrement(collection: string) {
  var result = 0;
  let tempResult: any = await prisma.$queryRaw`SELECT IDENT_CURRENT(${collection}) as result;`
  console.log("tempResult", tempResult)
  try {
    result = parseInt(tempResult[0].result)
    return result
  } catch (e) {
    throw "Error getting Auto Increment Number:\n" + e
  }
}

export function ensureAtLeast<T extends object, K extends keyof T & string>(
  value: T,
  keys: Array<K>,
): asserts value is Prisma.AtLeast<T, K> {
  for (const key of keys) {
    if (value[key] != null) {
      return;
    }
  }
  throw new Error(`Expected at least one of the keys set: ${keys.join(', ')}`);
}

export function handleClause(collection, id?, queryParams?) {
  var allPopulate = false;
  var singlePopulate = false;
  var listPopulate = false;
  var includeInput = {};
  var whereInput: any;
  var queryParamsObject: any;

  // if (populate && typeof populate === 'string') {
  //   if (populate == "*") {
  //     allPopulate = true;

  //   } else if (populate.split(',').length > 1) {
  //     listPopulate = true;
  //   } else {
  //     singlePopulate = true;
  //   }
  // }

  if (queryParams) {
    queryParamsObject = getObjectFromKeyPath(queryParams);
    console.log("filter", queryParamsObject);
  }

  switch (collection) {
    case "machine":
      var machineClause: Prisma.MachineWhereUniqueInput = {
        ...(id && { machineID: id }),
        ...queryParams?.where
      }
      whereInput = machineClause;
      break
    case "machineType":
      var machineTypeClause: Prisma.MachineTypeWhereUniqueInput = {
        ...(id && { machineTypeID: id }),
        ...queryParams?.where
      }
      whereInput = machineTypeClause;
      break;
    case "machinePalletDetail":
      var machinePalletDetailClause: Prisma.MachinePalletDetailWhereUniqueInput = {
        palletDetailID: id,
        ...queryParams?.where
      }
      whereInput = machinePalletDetailClause;


      break
    case "machineProductSummary":
      var machineProductSummaryClause: Prisma.MachineProductSummaryWhereUniqueInput = {
        summaryID: id,
        ...queryParams?.where
      }
      whereInput = machineProductSummaryClause;

      // if (populate) {
      //   var machineProductSummaryInclude: Prisma.MachineProductSummaryInclude = {

      //   };

      //   includeInput = {
      //     ...(allPopulate ? machineProductSummaryInclude : {}),
      //     ...(listPopulate ? {
      //       ...(createInclude(machineProductSummaryInclude, populate))
      //     } : {}),
      //     ...(singlePopulate ? { ...(createInclude(machineProductSummaryInclude, populate)) } : {})
      //   }
      // }
      break
    case "masterProduct":
      var masterProductClause: Prisma.MasterProductWhereUniqueInput = {
        productID: id,
        ...queryParams?.where
      }
      whereInput = masterProductClause;
      break
    case "user":
      var userClause: Prisma.UserWhereUniqueInput = {
        userID: id,
        ...queryParams?.where
      }
      whereInput = userClause
      break
    default:
      break;

  }
  return { singleWhereClause: { where: whereInput }, includeClause: { include: includeInput }, ...queryParamsObject }
}

export function handleDisplayData(collection: string, data) {
  switch (collection) {
    case "machine":

  }
}

export async function isAuthorised(token: string) {

  try {
    const result = await prisma.userSession.findFirstOrThrow({
      where: {
        // userID: "SuperAdmin",
        refreshToken: token
      },

    });
    // console.log("token", token, result.token, result.token == token);
    if (result.expiredDate.getTime() <= new Date().getTime()) {
      throw ("Token Expired")
    }
    return true;
  } catch (e) {
    console.log("error", e)
    throw (e);
  }
}

export async function AuthorisedMiddleware(req: NextApiRequest) {
  try {
    const { authorization } = req.headers
    if (authorization && authorization.includes("Bearer ")) {
      let tokenAuthorized = false;
      try {
        const payload = await verifyPublicJWT(authorization.replace("Bearer ", ""))
        // payload.
        console.log("payload", payload, Date.now())
        if (payload) {
          return true
        } else {
          throw "token expired"
        }

      } catch (e) {
        throw ("Access Denied, Authorized fail")
      }
      // try {
      //   tokenAuthorized = await isAuthorised(authorization.replace("Bearer ", ""));
      // } catch (e) {
      //   throw ("Access Denied, Authorized fail")
      // }

      // if (tokenAuthorized) {
      //   return
      // }
    } else {
      throw ("Access Denied, Bearer Token Not Found")
    }
  } catch (e) {
    throw CustomServerResponse(e, 403)
  }
}

export function getErrorMessage(code: string, collection: String) {
  switch (code) {
    case "P2002":
      return `There is a unique constraint violation on Collection: ${collection}`;
    case "P2025":
      return ``
    default:
      break;

  }
}
