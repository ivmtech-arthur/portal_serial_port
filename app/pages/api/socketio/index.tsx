import { Server } from 'Socket.IO'

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

    io.use((socket,next) => { 
      if (socket.handshake.query && socket.handshake.query.token) {
        
        jwt.verify(socket.handshake.query.token, 'SECRET_KEY', function (err, decoded) {
          if (err) return next(new Error('Authentication error'));
          socket.decoded = decoded;
          next();
        });
      }
      else {
        next(new Error('Authentication error'));
      }    
    })


    io.listen(3001);

    io.on('connection', socket => {
      const clientId = socket.id;
      // if (socket.handshake.query && socket.handshake.query.token) {
        
        console.log('A client connected', clientId);
        io.emit("client-new", clientId);
        socket.on('input-change', msg => {
          socket.broadcast.emit('update-input', msg)
        })

        socket.on('action', data => { 
          console.log("from client",data);
        })

        socket.on("disconnect", () => {
          console.log("A client disconnected.");
        });
      // } else { 
      //   res.status(403).json({
      //     message: `error authenticating socket connection on ${clientId}`
      //   })
      // }
  
    })

    res.socket.server.io = io
  }
  res.end()
}

export default SocketHandler