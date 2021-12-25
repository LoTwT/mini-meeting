import React, { useState } from "react"

import CameraButtonOnImg from "../../../../../resources/images/camera.svg"
import CameraButtonOffImg from "../../../../../resources/images/cameraOff.svg"

const CameraButton = () => {
  const [isLocalVideoDisabled, setIsLocalVideoDisabled] = useState(false)

  const cameraButtonImg = isLocalVideoDisabled
    ? CameraButtonOffImg
    : CameraButtonOnImg

  const handleCameraButtonClick = () =>
    setIsLocalVideoDisabled(!isLocalVideoDisabled)

  return (
    <div className="video_button_container">
      <img
        className="video_button_image"
        src={cameraButtonImg}
        alt="cameraButton"
        onClick={handleCameraButtonClick}
      />
    </div>
  )
}

export default CameraButton
