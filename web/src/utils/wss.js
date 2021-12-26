import io from "socket.io-client"
import { setParticipants, setRoomId } from "../store/action"
import { store } from "../store/store"

const SERVER = "http://localhost:1015"

let socket = null
export const connectWithSocketIOServer = () => {
  socket = io(SERVER)

  socket.on("connect", () => {
    console.log(`连接 socket.io 服务器成功: ${socket.id}`)
  })

  socket.on("room-id", (data) => {
    const { roomId } = data
    store.dispatch(setRoomId(roomId))
  })

  socket.on("room-update", (data) => {
    const { connectedUsers } = data
    store.dispatch(setParticipants(connectedUsers))
  })
}

// 主持人创建会议房间
export const createNewRoom = (identity) => {
  // 向服务器发送创建会议房间的数据 (事件)
  const data = {
    identity,
  }

  socket.emit("create-new-room", data)
}

// 加入会议房间
export const joinRoom = (roomId, identity) => {
  // 向服务器发送加入会议房间的数据 (事件)
}
