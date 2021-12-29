import io from "socket.io-client"
import { setParticipants, setRoomId, setSocketId } from "../store/action"
import { store } from "../store/store"
import { appendNewMessageToChatHistory } from "./directMessage"
import * as webRTCHandler from "./webRTCHandler"

const SERVER = "http://localhost:1015"

let socket = null
export const connectWithSocketIOServer = () => {
  socket = io(SERVER)

  socket.on("connect", () => {
    console.log(`连接 socket.io 服务器成功: ${socket.id}`)
    store.dispatch(setSocketId(socket.id))
  })

  socket.on("room-id", (data) => {
    const { roomId } = data
    store.dispatch(setRoomId(roomId))
  })

  socket.on("room-update", (data) => {
    const { connectedUsers } = data
    store.dispatch(setParticipants(connectedUsers))
  })

  socket.on("conn-prepare", (data) => {
    const { connUserSocketId } = data

    // 已经存在于房间的用户准备 webRTC 对等连接, false 表明发起方在等待接收方准备 webRTC
    webRTCHandler.prepareNewPeerConnection(connUserSocketId, false)

    // 通知对方 (发起方), 已经准备完毕, 可以进行 webRTC 连接
    socket.emit("conn-init", { connUserSocketId: connUserSocketId })
  })

  socket.on("conn-signal", (data) => webRTCHandler.handleSignalingData(data))

  socket.on("conn-init", (data) => {
    // 接收方的 socketId
    const { connUserSocketId } = data

    webRTCHandler.prepareNewPeerConnection(connUserSocketId, true)
  })

  socket.on("user-disconnected", (data) =>
    webRTCHandler.removePeerConnection(data),
  )

  socket.on("direct-message", (data) => {
    appendNewMessageToChatHistory(data)
  })
}

// 主持人创建会议房间
export const createNewRoom = (identity, onlyAudio) => {
  // 向服务器发送创建会议房间的数据 (事件)
  const data = {
    identity,
    onlyAudio,
  }

  socket.emit("create-new-room", data)
}

// 加入会议房间
export const joinRoom = (roomId, identity, onlyAudio) => {
  // 向服务器发送加入会议房间的数据 (事件)
  const data = {
    roomId,
    identity,
    onlyAudio,
  }

  socket.emit("join-room", data)
}

// ===========================================================================

// 将信令数据发送到服务器
export const signalPeerData = (data) => socket.emit("conn-signal", data)

export const sendDirectMessage = (data) => {
  socket.emit("direct-message", data)
}
