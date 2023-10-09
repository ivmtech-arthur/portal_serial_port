import { Server } from 'Socket.IO'

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log('Socket is already running' + res.socket.server + Object.keys(res.socket.server))
  } else {
    console.log('Socket is initializing')
    const io = new Server(res.socket.server,{
        cors: {
          origin: "*",
        },
        // path: "/socket.io/",
      })
    res.socket.server.io = io

      io.listen(3001);

    io.on('connection', socket => {
      socket.on('input-change', msg => {
        socket.broadcast.emit('update-input', msg)
      })
    })
  }
  res.end()
}

export default SocketHandler