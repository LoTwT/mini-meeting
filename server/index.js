const http = require("http")
const express = require("express")
const { v4: uuidv4 } = require("uuid")
const cors = require("cors")

const app = express()
const PORT = process.env.PORT || 1015

const server = http.createServer(app)

// 处理跨域
app.use(cors())

// ===========================================================================

// 初始化房间和用户
let connectedUsers = []
let rooms = []

// 创建路由验证房间是否存在
app.get("/api/room-exists/:roomId", (req, res) => {
  const { roomId } = req.params
  const room = rooms.find((room) => room.id === roomId)

  // 房间存在
  if (room) {
    // 房间是否满员
    if (room.connectedUsers.length > 3) {
      // 房间人数已满
      return res.send({ roomExists: true, full: true })
    } else {
      // 房间可以加入
      return res.send({ roomExists: true, full: false })
    }
  } else {
    // 房间不存在
    return res.send({ roomExists: false })
  }
})

// ===========================================================================

// socket.io
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
})

io.on("connection", (socket) => {
  console.log(`用户已成功连接 socket.io 服务器: ${socket.id}`)

  // 创建新会议房间
  socket.on("create-new-room", (data) => createNewRoomHandler(socket, data))

  // 加入会议房间
  socket.on("join-room", (data) => joinRoomHandler(socket, data))

  // 用户断开连接
  socket.on("disconnect", () => disconnectHandler(socket))
})

// socket.io handler
const createNewRoomHandler = (socket, data) => {
  console.log("主持人正在创建会议房间...")

  const { identity } = data

  // 生成新的 roomId
  const roomId = uuidv4()

  // 创建新用户 (进入会议的人)
  const newUser = {
    identity,
    id: uuidv4(),
    roomId,
    socketId: socket.id,
  }

  // 将新用户添加到已连接的用户数组里
  connectedUsers = [...connectedUsers, newUser]

  // 创建新的会议房间
  const newRoom = {
    id: roomId,
    connectedUsers,
  }

  // 将信访件添加到已创建的会议房间数组里
  rooms = [...rooms, newRoom]

  // 用户加入房间
  socket.join(roomId)

  // 向客户端发送数据，告知会议房间已创建完成 (roomId)
  socket.emit("room-id", { roomId })

  // 发送通知告知有新用户加入并更新房间
  socket.emit("room-update", { connectedUsers: newRoom.connectedUsers })
}

const joinRoomHandler = (socket, data) => {
  const { roomId, identity } = data

  const newUser = {
    identity,
    id: uuidv4(),
    roomId,
    socketId: socket.id,
  }

  // 判断传递过来的 roomId 是否匹配对应会议房间
  const room = rooms.find((room) => room.id === roomId)
  room.connectedUsers = [...room.connectedUsers, newUser]

  // 加入房间
  socket.join(roomId)

  // 将新用户添加到已连接的用户数组里
  connectedUsers = [...connectedUsers, newUser]

  // 发送通知告知有新用户加入并更新房间
  io.to(roomId).emit("room-update", { connectedUsers: room.connectedUsers })
}

const disconnectHandler = (socket) => {
  // 查询要离开会议房间的用户
  const user = connectedUsers.find((user) => user.socketId === socket.id)

  if (user) {
    // 从会议房间进行删除
    const room = rooms.find((room) => room.id === user.roomId)

    room.connectedUsers = room.connectedUsers.filter(
      (user) => user.socketId !== socket.id,
    )

    // 离开房间
    socket.leave(user.roomId)

    if (room.connectedUsers.length > 0) {
      // 发送通知告知有用户离开并更新房间
      io.to(room.id).emit("room-update", {
        connectedUsers: room.connectedUsers,
      })
    } else {
      // 当会议房间没有人员的时候要关闭整个会议房间 (从 rooms 中删除)
      rooms = rooms.filter((r) => r.id !== room.id)
    }
  }
}

// ===========================================================================

app.get("/", (req, res) => {
  res.end("mini-meeting")
})

// 监听端口号
server.listen(PORT, () =>
  console.log(`server is running at http://localhost:${PORT}`),
)
