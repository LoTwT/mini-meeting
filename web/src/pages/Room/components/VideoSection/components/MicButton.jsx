import React, { useState } from "react"

import MicButtonOnImg from "../../../../../resources/images/mic.svg"
import MicButtonOffImg from "../../../../../resources/images/micOff.svg"
import * as webRTCHandler from "../../../../../utils/webRTCHandler"

const MicButton = () => {
  const [isMicMuted, setIsMicMuted] = useState(false)

  const micButtonImg = isMicMuted ? MicButtonOffImg : MicButtonOnImg

  const handleMicButtonClick = () => {
    webRTCHandler.toggleMic(isMicMuted)
    setIsMicMuted(!isMicMuted)
  }

  return (
    <div className="video_button_container">
      <img
        className="video_button_image"
        src={micButtonImg}
        alt="micButton"
        onClick={handleMicButtonClick}
      />
    </div>
  )
}

export default MicButton
