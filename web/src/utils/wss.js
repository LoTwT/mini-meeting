import io from "socket.io-client"

const SERVER = "http://localhost:1015"

let socket = null
export const connectWithSocketIOServer = () => {
  socket = io(SERVER)

  socket.on("connect", () => {
    console.log(`连接 socket.io 服务器成功: ${socket.id}`)
  })
}
