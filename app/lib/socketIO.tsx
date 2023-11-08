import { Server } from 'Socket.IO'

export const globalSocketIOClient = global as unknown as { IOServer: Server }

type a = {

}

interface b {
    "test": string
}

var actionMap = {
    "unlock": {
        config: any,
        payloadType: string
    }
}

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

function validatePayload(action,payload) { 
    switch (action) { 
        case "unlock":
            break;
        
    }

    return true
}


export const handleIOEmit = (socketID, action: string, payload) => {
    var io = globalSocketIOClient.IOServer
    try {
        if (io) {
            console.log("io server", socketID, action, payload)
            // 
            if (validatePayload(action,payload)) {
                // let b = payload as actionType[action as actionString]
                const a = io.to(socketID).emit(action, payload)
                return a;
            } else { 
                throw("")
            }
                // var ioServer = io.listen(3001)
               
        } else {
            throw ("socketIOclient not initialized")
        }
    } catch (e) {
        throw e
    }

}