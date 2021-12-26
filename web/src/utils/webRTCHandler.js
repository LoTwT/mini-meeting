import { store } from "../store/store"
import { setShowOverlay } from "../store/action"
import * as wss from "./wss"
import Peer from "simple-peer"

// 设置默认的采集音视频流的配置
const defaultConstraints = {
  audio: true,
  video: true,
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

// 显示本地视频
const showLocalVideoPreview = (stream) => {}

// ===========================================================================

let peers = {}

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
}

// 将信令数据添加到接收 webRTC 对等连接准备的一方的对等对象中
export const handleSignalingData = (data) => {
  peers[data.connUserSocketId].signal(data.signal)
}

// ===========================================================================
