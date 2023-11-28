import { Server, Socket } from 'socket.io'
import { prisma } from './prisma';
import { CollectionsOutlined } from '@mui/icons-material';

export const globalSocketIOClient = global as unknown as { IOServer: Server }

export type SocketRequest = {
    action: string,
    payload: any,
    timestamp?: number
}

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

export const socketIOEventMap = [
    {
        name: "getMachineInfo",
        serverEvent: "server-get-machine-info",
        clientEvent: "client-get-machine-info",
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
        serverEvent: "server-unlock",
        clientEvent: "client-unlock",
        timeout: 10000,
        pingTime: 1000,
        onReceivedCallBack: async (response: SocketResponse, machineID: number, socket: Socket) => {
            console.log("event finished callback", eventArg.eventFinished, eventArg.eventReturn, response)
            setEventFinish(true, response)
        }
    },
    {
        name: "getWeights",
        serverEvent: "server-get-weights",
        clientEvent: "client-get-weights",
        timeout: 10000,
        pingTime: 1000,
        onReceivedCallBack: async (response: SocketResponse, machineID: number, socket: Socket) => {
            console.log("event finished callback", eventArg.eventFinished, eventArg.eventReturn, response)
            setEventFinish(true, response)
        }
    },
    {
        name: "replenishment",
        serverEvent: "server-replenishment",
        payload: false,
        timeout: 18000000,
        pingTime: 1000,
        clientEvent: "client-replenishment",
        actionLocal: "server-replenishment-local",
        onReceivedCallBack: async (response: SocketResponse, machineID: number, socket: Socket) => {
            var io = globalSocketIOClient.IOServer
            const { result } = response.data
            const palletDetails = await prisma.machinePalletDetail.findMany({
                where: {
                    machineID
                },
                include: {
                    masterProduct: true
                }
            })
            const a = palletDetails.map((detail, index) => {
                const weightDiff: number = result.find((item) => detail.palletID == item.palletID).value;
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
        serverEvent: "server-end-replenishment",
        payload: false,
        clientEvent: "client-end-replenishment",
    },
    {
        name: "changePalletPrice",
        timeout: 2000,
        pingTime: 500,
        serverEvent: "server-change-pallet-price",
        clientEvent: "client-change-pallet-price",
        onReceivedCallBack: async (data: SocketResponse, machineID, socket) => {
            console.log("event finished callback", eventArg.eventFinished, eventArg.eventReturn, data)
            setEventFinish(true, data)
        },
    },
    {
        name: "getWeights",
        serverEvent: "server-get-weights",
        clientEvent: "client-get-weights",
        onReceivedCallBack: async (response: SocketResponse, machineID, socket) => {
            console.log("event finished callback", eventArg.eventFinished, eventArg.eventReturn, response)
            setEventFinish(true, response.data)
        },
    },
    {
        name: "calibration",
        timeout: 10000,
        pingTime: 1000,
        serverEvent: "server-calibration",
        clientEvent: "client-calibration",
        onReceivedCallBack: async (response: SocketResponse, machineID, socket) => {
            console.log("event finished callback", eventArg.eventFinished, eventArg.eventReturn, response)
            setEventFinish(true, response.data)
        },
    },
    {
        name: "peeling",
        timeout: 10000,
        pingTime: 1000,
        serverEvent: "server-peeling",
        clientEvent: "client-peeling",
        onReceivedCallBack: async (response: SocketResponse, machineID, socket) => {
            console.log("event finished callback", eventArg.eventFinished, eventArg.eventReturn, response)
            setEventFinish(true, response.data)
        },
    },
    {
        name: "screenSoundControl",
        timeout: 10000,
        pingTime: 1000,
        serverEvent: "server-screen-sound-control",
        clientEvent: "client-screen-sound-control",
        onReceivedCallBack: async (response: SocketResponse, machineID, socket) => {
            console.log("event finished callback", eventArg.eventFinished, eventArg.eventReturn, response)
            setEventFinish(true, response.data)
        },
    },
    {
        name: "controlLight",
        timeout: 10000,
        pingTime: 1000,
        serverEvent: "server-control-light",
        clientEvent: "client-control-light",
        onReceivedCallBack: async (response: SocketResponse, machineID, socket) => {
            console.log("event finished callback", eventArg.eventFinished, eventArg.eventReturn, response)
            setEventFinish(true, response.data)
        },
    },
    
    {
        name: "controlGlassHeat",
        timeout: 10000,
        pingTime: 1000,
        serverEvent: "server-control-glass-Heat",
        clientEvent: "client-control-glass-heat",
        onReceivedCallBack: async (response: SocketResponse, machineID, socket) => {
            console.log("event finished callback", eventArg.eventFinished, eventArg.eventReturn, response)
            setEventFinish(true, response.data)
        },
    },
    {
        name: "queryDeviceStatus",
        timeout: 10000,
        pingTime: 1000,
        serverEvent: "server-query-device-status",
        clientEvent: "client-query-device-status",
        onReceivedCallBack: async (response: SocketResponse, machineID, socket) => {
            console.log("event finished callback", eventArg.eventFinished, eventArg.eventReturn, response)
            setEventFinish(true, response.data)
        },
    },
    {
        name: "controlTemperature",
        timeout: 10000,
        pingTime: 1000,
        serverEvent: "server-control-temperature",
        clientEvent: "client-control-temperature",
        onReceivedCallBack: async (response: SocketResponse, machineID, socket) => {
            console.log("event finished callback", eventArg.eventFinished, eventArg.eventReturn, response)
            setEventFinish(true, response.data)
        },
    }
]


function validatePayload(event, payload) {
    switch (event) {
        case "":
            break;
    }

    if (!socketIOEventMap.find((eventItem) => eventItem.name == event)) {
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


export const handleIOEmit = (socketID, event: string, payload: any, action?: string) => {
    var io = globalSocketIOClient.IOServer
    try {
        if (io) {
            console.log("io server", socketID, event, payload)
            setEventFinish(false, {})
            if (validatePayload(event, payload)) {
                var request: SocketRequest = {
                    action: action,
                    payload: payload,
                }
                // let b = payload as actionType[action as actionString]
                const a = io.to(socketID).emit(socketIOEventMap.find((eventItem) => eventItem.name == event).serverEvent, request)
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

export const IOEvent = async (socketID, event: string, payload?: any, action?: string) => {
    var io = globalSocketIOClient.IOServer
    var actionItem = socketIOEventMap.find((actionItem) => actionItem.name == event)
    console.log("event started", eventArg.eventFinished, eventArg.eventReturn)
    return new Promise<any>(async (resolve, reject) => {

        handleIOEmit(socketID, event, payload, action)
        console.log("event waiting", eventArg.eventFinished, eventArg.eventReturn)
        let timeout = 0;
        const eventTimer = setInterval(() => {
            try {
                console.log("event finished", eventArg.eventFinished, eventArg.eventReturn)
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

        // io.on(socketIOActionMap.find((actionItem) => actionItem.name == action).clientEvent, (data: SocketResponse) => {
        //     console.log("socket event received via IOEvent:", data.action)
        //     resolve(data.data)
        // })


    })
}