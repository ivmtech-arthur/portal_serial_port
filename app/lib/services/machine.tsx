import { prisma } from "lib/prisma";
const machine = prisma.machine

async function updatePalletDetailReplenishment(data: any[], id) {
    await machine.update({
        where: {
            machineID: id
        },
        data: {
            // machinePalletDetail
        }
    })
}

const a = {
    updatePalletDetailReplenishment
}
export default a