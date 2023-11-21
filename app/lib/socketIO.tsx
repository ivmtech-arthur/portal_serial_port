import { Server, Socket } from 'socket.io'
import { prisma } from './prisma';
import { CollectionsOutlined } from '@mui/icons-material';

export const globalSocketIOClient = global as unknown as { IOServer: Server }

export type SocketResponse = {
    action: string,
    token?: string,
    data: any,
    timestamp: number
}

let eventArg = global as unknown as {
    eventFinished: boolean,
    eventReturn: any
}
// let eventReturn = {}

export const socketIOActionMap = [
    {
        name: "getMachineInfo",
        serverAction: "server-get-machine-info",
        clientAction: "client-get-machine-info",
        payload: false,
        timeout: 10000,
        pingTime: 1000,
        onReceivedCallBack: async (response: SocketResponse, machineID: number, socket: Socket, clientID?: string) => {
            var io = globalSocketIOClient.IOServer
            const data = response.data
            const result = await prisma.machine.findFirst({
                where: {
                    socketID: clientID
                },
            })

            // socket.broadcast.emit("local-replenishment", { a })

            io.to(clientID).emit("server-get-machine-info", result)
            // let localReponse: SocketResponse = {
            //     action: "local-replenishment",
            //     data: a,
            //     timestamp: new Date().getTime()
            // }
            // io.emit("local-replenishment", localReponse)
            // // io.to("-Q4MdUErXCVuLkKRAAAB").emit("local-replenishment", { a })
            // // prisma.
            // console.log("received data hehe", response.data, a)
        },
    },
    {
        name: "unlock",
        serverAction: "server-unlock",
        clientAction: "client-unlock",
        timeout: 10000,
        pingTime: 1000,
        onReceivedCallBack: async (response: SocketResponse, machineID: number, socket: Socket) => {
            console.log("event finished callback", eventArg.eventFinished, eventArg.eventReturn, response)
            setEventFinish(true, response)
        }
    },
    {
        name: "getWeights",
        serverAction: "server-get-weights",
        clientAction: "client-get-weights",
        timeout: 10000,
        pingTime: 1000,
        onReceivedCallBack: async (response: SocketResponse, machineID: number, socket: Socket) => {
            console.log("event finished callback", eventArg.eventFinished, eventArg.eventReturn, response)
            setEventFinish(true, response)
        }
    },
    {
        name: "replenishment",
        serverAction: "server-replenishment",
        payload: false,
        timeout: 18000000,
        pingTime: 1000,
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
    {
        name: "changePalletPrice",
        timeout: 2000,
        pingTime: 500,
        serverAction: "server-change-pallet-price",
        clientAction: "client-change-pallet-price",
        onReceivedCallBack: async (data: SocketResponse, machineID, socket) => {
            console.log("event finished callback", eventArg.eventFinished, eventArg.eventReturn, data)
            setEventFinish(true, data)
        },
    },
    {
        name: "getWeights",
        serverAction: "server-get-weights",
        clientAction: "client-get-weights",
        onReceivedCallBack: async (data: SocketResponse, machineID, socket) => {
            console.log("event finished callback", eventArg.eventFinished, eventArg.eventReturn, data)
            setEventFinish(true, data.data)
        },
    },
    {
        name: "calibration",
        timeout: 10000,
        pingTime: 1000,
        serverAction: "server-calibration",
        clientAction: "client-calibration",
        onReceivedCallBack: async (data: SocketResponse, machineID, socket) => {
            console.log("event finished callback", eventArg.eventFinished, eventArg.eventReturn, data)
            setEventFinish(true, data.data)
        },
    },
    {
        name: "peeling",
        timeout: 10000,
        pingTime: 1000,
        serverAction: "server-peeling",
        clientAction: "client-peeling",
        onReceivedCallBack: async (data: SocketResponse, machineID, socket) => {
            console.log("event finished callback", eventArg.eventFinished, eventArg.eventReturn, data)
            setEventFinish(true, data.data)
        },
    }
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
        console.log("result.socketID", result.socketID, clientID)
        throw ("socket session expired")
    }

    return result.machineID
}


export const handleIOEmit = (socketID, action: string, payload) => {
    var io = globalSocketIOClient.IOServer
    try {
        if (io) {
            console.log("io server", socketID, action, payload)
            setEventFinish(false, {})
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

export function setEventFinish(finished: boolean, payload: any) {
    eventArg.eventFinished = finished
    eventArg.eventReturn = payload
}

export const IOEvent = async (socketID, action: string, payload?: any) => {
    var io = globalSocketIOClient.IOServer
    var actionItem = socketIOActionMap.find((actionItem) => actionItem.name == action)
    console.log("event started", eventArg.eventFinished, eventArg.eventReturn)
    return new Promise<any>(async (resolve, reject) => {

        handleIOEmit(socketID, action, payload)
        console.log("event waiting", eventArg.eventFinished, eventArg.eventReturn)
        let timeout = 0;
        const eventTimer = setInterval(() => {
            try {
                // console.log("event finished", eventArg.eventFinished, eventArg.eventReturn)
                if (eventArg.eventFinished) {
                    resolve(eventArg.eventReturn)
                    setEventFinish(false, {})
                    clearInterval(eventTimer)
                }
                if (timeout > (actionItem.timeout ? actionItem.timeout : 10000)) {
                    clearInterval(eventTimer)
                    throw ("event timeout")
                }
            } catch (e) {
                reject(e)
            }
            timeout += actionItem.pingTime;
        }, actionItem.pingTime || 1000)

        // io.on(socketIOActionMap.find((actionItem) => actionItem.name == action).clientAction, (data: SocketResponse) => {
        //     console.log("socket event received via IOEvent:", data.action)
        //     resolve(data.data)
        // })


    })
}