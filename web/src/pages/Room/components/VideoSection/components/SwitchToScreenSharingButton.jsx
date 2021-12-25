import React, { useState } from "react"

import SwitchImg from "../../../../../resources/images/switchToScreenSharing.svg"

const SwitchToScreenSharingButton = () => {
  const [isScreenSharingActive, setIsScreenSharingActive] = useState(false)

  const handleScreenShareToggle = () =>
    setIsScreenSharingActive(!isScreenSharingActive)

  return (
    <div className="video_button_container">
      <img
        className="video_button_image"
        src={SwitchImg}
        alt="switchToScreenSharingButton"
        onClick={handleScreenShareToggle}
      />
    </div>
  )
}

export default SwitchToScreenSharingButton
