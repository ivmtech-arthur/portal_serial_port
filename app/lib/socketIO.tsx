import { Server, Socket } from 'Socket.IO'
import { prisma } from './prisma';

export const globalSocketIOClient = global as unknown as { IOServer: Server }

type a = {

}

interface b {
    "test": string
}

// var actionMap = {
//     "unlock": {
//         config: any,
//         payloadType: string
//     }
// }

type Fruit = "apple" | "banana" | "orange";
type NewType = {
    [F in Fruit]: {
        name: F;
    };
};

interface payloadType {
    unlock: {};
    test: string;
}

enum actionString { unlock = "unlock", test = "test" }
type actionType = {
    [A in actionString]: {
        payloadType: any
    }
}

export type SocketResponse = {
    action: string,
    token?: string,
    data: any,
    timestamp: number
}

export const socketIOActionMap = [
    {
        name: "replenishment",
        serverAction: "server-replenishment",
        payload: false,
        clientAction: "client-replenishment",
        actionLocal: "server-replenishment-local",
        onReceivedCallBack: async (response: SocketResponse, machineID: number, socket: Socket) => {
            var io = globalSocketIOClient.IOServer
            const data = response.data
            const result = await prisma.machinePalletDetail.findMany({
                where: {
                    machineID
                },
                include: {
                    masterProduct: true
                }
            })
            const a = result.map((detail, index) => {
                const weightDiff: number = data.find((item) => detail.palletID == item.palletID).value;
                let inventory = Math.floor(weightDiff / detail.weightPerUnit.toNumber())
                const remainder = weightDiff % detail.weightPerUnit.toNumber();
                if (remainder / detail.weightPerUnit.toNumber() >= 0.9) { 
                    inventory += 1
                }
                return {
                    id: detail.palletDetailID,
                    machineID: detail.machineID,
                    palletID: detail.palletID,
                    unit: detail.masterProduct.unit,
                    currentInventory: detail.inventory.toNumber(),
                    inventory: inventory,
                }
            })
            // socket.broadcast.emit("local-replenishment", { a })
            // socket.emit()
            let localReponse: SocketResponse = {
                action: "local-replenishment",
                data: a,
                timestamp: new Date().getTime()
            }
            io.emit("local-replenishment", localReponse)
            // io.to("-Q4MdUErXCVuLkKRAAAB").emit("local-replenishment", { a })
            // prisma.
            console.log("received data hehe", response.data, a)
        },
    },
    {
        name: "end-replenishment",
        serverAction: "server-end-replenishment",
        payload: false,
        clientAction: "client-end-replenishment",
    },

]


function validatePayload(action, payload) {
    switch (action) {

        case "":
            break;

    }

    if (!socketIOActionMap.find((actionItem) => actionItem.name == action)) {
        throw ("action not found")
    }

    return true
}

export async function validateIOAccess(token, clientID) {
    const result = await prisma.machine.findUnique({
        where: {
            serverToken: token
        },
    })

    if (!result) {
        throw ("machine not found")
    }

    // if(!result)

    if (result.socketID != clientID) {
        throw ("socket session expired")
    }

    return result.machineID
}


export const handleIOEmit = (socketID, action: string, payload) => {
    var io = globalSocketIOClient.IOServer
    try {
        if (io) {
            console.log("io server", socketID, action, payload)
            // 
            if (validatePayload(action, payload)) {
                // let b = payload as actionType[action as actionString]
                const a = io.to(socketID).emit(socketIOActionMap.find((actionItem) => actionItem.name == action).serverAction, payload)
                return a;
            } else {
                throw ("")
            }
            // var ioServer = io.listen(3001)

        } else {
            throw ("socketIOclient not initialized")
        }
    } catch (e) {
        throw e
    }

}