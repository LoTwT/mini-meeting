import { store } from "../store/store"
import { setShowOverlay } from "../store/action"
import * as wss from "./wss"
import Peer from "simple-peer"

// 设置默认的采集音视频流的配置
const defaultConstraints = {
  audio: true,
  video: { width: "480", height: "360" },
}

let localStream = null

// 采集本地音视频并初始化房间
export const getLocalPreviewAndInitRoomConnection = (
  isRoomHost,
  identity,
  roomId = null,
) => {
  // 采集本地音视频流 (获取媒体输入的访问权限)
  // https://developer.mozilla.org/zh-CN/docs/Web/API/MediaDevices/getUserMedia
  navigator.mediaDevices
    .getUserMedia(defaultConstraints)
    .then((stream) => {
      console.log("成功获取本地媒体流")

      localStream = stream

      // 预览本地视频
      showLocalVideoPreview(localStream)

      // 派发 action, 隐藏加载动画
      store.dispatch(setShowOverlay(false))

      // 初始化房间连接
      isRoomHost ? wss.createNewRoom(identity) : wss.joinRoom(roomId, identity)
    })
    .catch((error) => console.log("获取本地媒体流失败: ", error))
}

// ===========================================================================

let peers = {}
let streams = []

// 配置 STUN 服务器
const getConfiguration = () => ({
  iceServers: [
    {
      urls: "stun:stun1.l.google.com:19302",
    },
  ],
})

// 准备 webRTC 对等连接
export const prepareNewPeerConnection = (connUserSocketId, isInitiator) => {
  const configuration = getConfiguration()

  // 实例化对等对象
  peers[connUserSocketId] = new Peer({
    initiator: isInitiator,
    config: configuration,
    stream: localStream,
  })

  // 信令数据交换
  peers[connUserSocketId].on("signal", (data) => {
    // data: a webrtc offer, answer, or ice candidate
    const signalData = {
      signal: data,
      connUserSocketId,
    }

    wss.signalPeerData(signalData)
  })

  // 获取媒体流 stream
  peers[connUserSocketId].on("stream", (stream) => {
    console.log("成功获取远程 stream")
    // 显示接收的 stream 流
    addStream(stream, connUserSocketId)
    streams = [...streams, stream]
  })
}

// 将信令数据添加到接收 webRTC 对等连接准备的一方的对等对象中
export const handleSignalingData = (data) => {
  peers[data.connUserSocketId].signal(data.signal)
}

// ===========================================================================
// Video UI
// 显示本地视频
const showLocalVideoPreview = (stream) => {
  const videosContainer = document.getElementById("videos-portal")
  videosContainer.classList.add("videos_protal_styles")

  const videoContainer = document.createElement("div")
  videoContainer.classList.add("video_track_container")

  const videoElement = document.createElement("video")
  // 自动播放
  videoElement.autoplay = true
  // 静音
  videoElement.muted = true
  // 媒体流
  videoElement.srcObject = stream

  // 在指定视频/音频 (audio/video) 的元数据加载后触发
  videoElement.onloadedmetadata = () => {
    videoElement.play()
  }

  videoContainer.appendChild(videoElement)
  videosContainer.appendChild(videoContainer)
}

// 添加接收的 stream 媒体流并进行显示
const addStream = (stream, connUserSocketId) => {
  // 使用 js 创建容器展示视频
  const videosContainer = document.getElementById("videos-portal")

  const videoContainer = document.createElement("div")
  videoContainer.classList.add("video_track_container")
  videoContainer.id = connUserSocketId

  const videoElement = document.createElement("video")
  // 自动播放
  videoElement.autoplay = true
  // 静音
  videoElement.muted = true
  // 媒体流
  videoElement.srcObject = stream

  // 在指定视频/音频 (audio/video) 的元数据加载后触发
  videoElement.onloadedmetadata = () => {
    videoElement.play()
  }

  // 放大/缩小视频信息
  videoElement.addEventListener("click", () => {
    if (videoElement.classList.contains("full_screen")) {
      videoElement.classList.remove("full_screen")
    } else {
      videoElement.classList.add("full_screen")
    }
  })

  videoContainer.appendChild(videoElement)
  videosContainer.appendChild(videoContainer)
}

// ===========================================================================
