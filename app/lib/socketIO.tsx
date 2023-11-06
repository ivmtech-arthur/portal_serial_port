import { Server } from 'Socket.IO'

export const globalSocketIOClient = global as unknown as { IOServer: Server }

type a = {

}

interface b {
    "test": string
}

type actionMap = {
    "unlock": {
        config: any,
        payloadType: {}
    }
}

export const handleIOEmit = (socketID, action, payload) => {
    var io = globalSocketIOClient.IOServer
    try {
        if (io) {
            console.log("io server", socketID, action, payload)
            // var ioServer = io.listen(3001)
            const a = io.to(socketID).emit(action, payload)
            return a;
        } else {
            throw ("socketIOclient not initialized")
        }
    } catch (e) {
        throw e
    }

}