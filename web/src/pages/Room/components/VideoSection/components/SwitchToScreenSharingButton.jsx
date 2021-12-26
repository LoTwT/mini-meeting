import React, { useState } from "react"

import SwitchImg from "../../../../../resources/images/switchToScreenSharing.svg"
import LocalScreenSharingPreview from "./LocalScreenSharingPreview"
import * as webRTCHandler from "../../../../../utils/webRTCHandler"

const constraints = {
  audio: false,
  video: true,
}

const SwitchToScreenSharingButton = () => {
  const [isScreenSharingActive, setIsScreenSharingActive] = useState(false)
  const [screenSharingStream, setScreenSharingStream] = useState(null)

  const handleScreenShareToggle = async () => {
    if (!isScreenSharingActive) {
      let stream = null

      try {
        // 获取本地要共享的媒体资源
        stream = await navigator.mediaDevices.getDisplayMedia(constraints)
      } catch (error) {
        console.log(`获取共享屏幕的媒体流失败: ${error}`)
      }

      if (stream) {
        setScreenSharingStream(stream)
        webRTCHandler.toggleScreenShare(isScreenSharingActive, stream)
        setIsScreenSharingActive(true)
      }
    } else {
      webRTCHandler.toggleScreenShare(isScreenSharingActive)
      setIsScreenSharingActive(false)

      // 停止共享屏幕
      screenSharingStream.getTracks().forEach((track) => track.stop())
      setScreenSharingStream(null)
    }
  }

  return (
    <>
      <div className="video_button_container">
        <img
          className="video_button_image"
          src={SwitchImg}
          alt="switchToScreenSharingButton"
          onClick={handleScreenShareToggle}
        />
      </div>
      {isScreenSharingActive && (
        <LocalScreenSharingPreview stream={screenSharingStream} />
      )}
    </>
  )
}

export default SwitchToScreenSharingButton
