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
  const isRoomExist = rooms.find((room) => room.id === roomId)

  // 房间存在
  if (isRoomExist) {
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

  socket.on("create-new-room", (data) => createNewRoomHandler(socket, data))
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

// ===========================================================================

app.get("/", (req, res) => {
  res.end("mini-meeting")
})

// 监听端口号
server.listen(PORT, () =>
  console.log(`server is running at http://localhost:${PORT}`),
)
