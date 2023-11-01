import { Decimal } from 'decimal.js'
import superjson from 'superjson'

export function convertObjDecimalToNum(obj){
    for (const key in obj) { 
        const value = obj[key];
        if (value instanceof Decimal) {
            obj[key] = value.toNumber()
        }
    }

    return obj
}

export default superjson