import { Decimal } from 'decimal.js'
import superjson, { deserialize } from 'superjson'



export function deserializeObjInit(serilizedObj: any) {
    let obj: any[] = deserialize(serilizedObj)
    return deserializeObj2(obj)
}

export function deserializeListInit(serilizedObj: any) {
    let objList: any[] = deserialize(serilizedObj)
    return deserializeObjList2(objList)
}

function handleType(obj, key, value) {
    if (value instanceof Decimal) {
        obj[key] = value.toNumber()
    } else if (value instanceof Date) {
        obj[key] = value.toString()
    } else if (Array.isArray(value)) {
        obj[key] = deserializeObjList2(value)
    } else if (value instanceof Object) {
        obj[key] = deserializeObj2(value)
    }
}

function deserializeObj2(obj: any) {

    for (const key in obj) {
        const value = obj[key];
        handleType(obj, key, value)
    }

    return obj
}

function deserializeObjList2(objList: any) {

    console.log("conFvertObjListDecimalToNum", objList)
    let newObjList = objList.map((obj) => {
        let tempObj = obj
        for (const key in obj) {
            const value = tempObj[key];
            handleType(tempObj, key, value)
        }

        return tempObj
    })

    return newObjList
}

export default superjson