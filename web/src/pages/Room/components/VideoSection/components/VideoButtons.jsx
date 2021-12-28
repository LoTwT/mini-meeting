import React from "react"
import { connect } from "react-redux"

import MicButton from "./MicButton"
import CameraButton from "./CameraButton"
import LeaveRoomButton from "./LeaveRoomButton"
import SwitchToScreenSharingButton from "./SwitchToScreenSharingButton"

const VideoButtons = ({ connectOnlyWithAudio }) => {
  return (
    <div className="video_buttons_container">
      <MicButton />
      {!connectOnlyWithAudio && <CameraButton />}
      <LeaveRoomButton />
      {!connectOnlyWithAudio && <SwitchToScreenSharingButton />}
    </div>
  )
}

const mapStateToProps = (state) => ({
  ...state,
})

export default connect(mapStateToProps)(VideoButtons)
