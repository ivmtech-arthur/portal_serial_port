import { Server } from 'Socket.IO'
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

export const socketIOActionMap = [
    {
        name: "replenishment",
        serverAction: "server-replenishment",
        payload: false,
        clientAction: "client-replenishment",
        onReceivedCallBack: (data) => {
            // prisma.
            console.log("received data", data)
        },
    },
    {
        name: "test",
        serverAction: "server-test",
        payload: false,
        clientAction: "client-test",
    },

]


function validatePayload(action, payload) {
    switch (action) {

        case "":
            break;

    }

    if (!socketIOActionMap.find((actionItem) => actionItem.name == action)){
        throw ("action not found")
    }

    return true
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