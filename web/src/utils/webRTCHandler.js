import { store } from "../store/store"
import { setShowOverlay } from "../store/action"
import * as wss from "./wss"

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

const showLocalVideoPreview = (stream) => {
  // 显示本地视频
}
