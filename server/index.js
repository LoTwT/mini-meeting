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
const connectedUsers = []
const rooms = []

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

// socker.io
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
})

app.get("/", (req, res) => {
  res.end("mini-meeting")
})

// 监听端口号
server.listen(PORT, () =>
  console.log(`server is running at http://localhost:${PORT}`),
)
