import { Prisma } from '@prisma/client'
import { Server } from 'Socket.IO'
import { CustomRequest } from 'lib/api/handler'
import { multipleEntryhandler } from 'lib/api/multipleEntries'
import { singleEntryHandler } from 'lib/api/singleEntry'
import { prisma } from 'lib/prisma'
import { globalSocketIOClient } from 'lib/socketIO'

const getTokenMachine = async (handshake) => {
  const token = handshake.auth.token
  let where: Prisma.MachineWhereInput = {
    serverToken: token
  }

  return await prisma.machine.findFirstOrThrow({
    where: where
  }
  )

}

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log('Socket is already running' + res.socket.server + Object.keys(res.socket.server))
  } else {
    console.log('Socket is initializing')
    const io = new Server(res.socket.server, {
      cors: {
        origin: "*",
      },
      // path: "/socket.io/",
    })

    // io.use(async (socket, next) => {
    //   console.log("socketio1", socket.handshake.auth, socket.handshake.auth.token)
    //   // var handshake = socket.auth
    //   if (socket.handshake.query && socket.handshake.query.token) {
    //     console.log("socketio2xd", socket.handshake, socket.handshake.query, socket.handshake.query.token)
    //     let token = `${socket.handshake.query.token}`;
    //     let where: Prisma.MachineWhereInput = {
    //       serverToken: token
    //     }
    //     const req: CustomRequest = {
    //       query: {
    //         collection: "user",
    //         where: where
    //       },
    //       method: "GET"
    //     }
    //     const result = await singleEntryHandler(req);

    //     // jwt.verify(socket.handshake.query.token, 'SECRET_KEY', function (err, decoded) {
    //     //   if (err) return next(new Error('Authentication error'));
    //     //   socket.decoded = decoded;
    //     //   next();
    //     // });
    //   }
    //   else {
    //     next(new Error('Authentication error'));
    //   }
    // })

    io.use((socket, next) => {
      let err = null
      try {
        let handshake = socket.handshake;
        // ...
        console.log("handshake is", handshake.auth.token,)
        next()
        if (handshake.auth.token) {
          // return await getTokenMachine(handshake).then((result) => { 
          //   if (result.machineID) { 
          //     return next()
          //   }
          // })

          // setTimeout(() => {
          //   getTokenMachine(handshake).then((result) => {
          //     if (result.machineID) {
          //       next()
          //     }
          //   })
          //   // next is called after the client disconnection
          //   next({});
          // }, 1000);

          // if (result.machineID) {
          //   next()
          // }
        } else {
          throw "token not found222"
        }
      } catch (e) {
        err = e
        return next(e)
      }

      // if ()
    });

    //     io.of((name, query, next) => {
    //       // the checkToken method must return a boolean, indicating whether the client is able to connect or not.
    //       // next(null, checkToken(query.token));
    //       console.log("query is", query)
    //       next(null, true)
    //     }).on("connection", (socket) => {
    //       console.log('A client connected', socket.handshake?.query, socket.handshake?.query?.token);
    //       const clientId = socket.id;
    //       if (socket.handshake.query && socket.handshake.query.token) {

    //         console.log('A client connected', clientId);
    //         io.emit("client-new", clientId);
    //         socket.on('input-change', msg => {
    //           socket.broadcast.emit('update-input', msg)
    //         })

    //         socket.on('action', data => {
    //           console.log("from client", data);
    //         })

    //         socket.on("disconnect", () => {
    //           console.log("A client disconnected.");
    //         });
    //       } else {
    //         res.status(403).json({
    //           message: `error authenticating socket connection on ${clientId}`
    //         })
    //       }
    //       /* ... */
    // });

    io.listen(3001);

    io.on('connection', async socket => {
      const clientId = socket.id;
      console.log('A client connected', socket.handshake?.query, socket.handshake?.query?.token, clientId);
      const token = socket.handshake?.query?.token as string

      if (socket.handshake.auth && socket.handshake.auth.token) {
      
        console.log('A client connected', clientId);
       
        try {
          const result = await prisma.machine.update({
            where: {
              serverToken: token
            },
            data: {
              socketID: clientId,
              isActive: true
            }
          })
          if (!result) { 
            socket.disconnect()
          }
        } catch (e) { 
          socket.disconnect()
        }
          // io.emit("client-new", clientId);
          // socket.on('input-change', msg => {
          //   socket.broadcast.emit('update-input', msg)
          // })

          socket.on('action', data => {
            console.log("from client", data);
            // res.end()
          })

        socket.on("disconnect", async () => {
          await prisma.machine.update({
            where: {
              serverToken: token
            },
            data: {
              isActive: false
            }
          })
          console.log("A client disconnected.");
          // res.end()
        });

        // res.end()
      } else {
        console.log("token not found")
        // res.status(403).json({
        //   message: `error authenticating socket connection on ${clientId}`
        // })
      }
      // res.end()
    })

    res.socket.server.io = io

    globalSocketIOClient.IOServer = io
  }
  res.end()
}

export default SocketHandler