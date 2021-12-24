const http = require("http")
const express = require("express")
const { v4: uuidv4 } = require("uuid")
const cors = require("cors")

const app = express()
const PORT = process.env.PORT || 1015

const server = http.createServer(app)

// 处理跨域
app.use(cors())

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
