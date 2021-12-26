import React, { useEffect } from "react"
import { connect } from "react-redux"

import "./Room.css"
import ParticipantsSection from "./components/ParticipantsSection/ParticipantsSection"
import VideoSection from "./components/VideoSection/VideoSection"
import ChatSection from "./components/ChatSection/ChatSection"
import RoomLabel from "./components/RoomLabel"
import * as webRTCHandler from "../../utils/webRTCHandler"
import Overlay from "./components/Overlay"

const Room = ({ isRoomHost, identity, roomId, showOverlay }) => {
  useEffect(() => {
    webRTCHandler.getLocalPreviewAndInitRoomConnection(
      isRoomHost,
      identity,
      roomId,
    )
  }, [])

  return (
    <div className="room_container">
      <ParticipantsSection />
      <VideoSection />
      <ChatSection />
      <RoomLabel roomId={roomId} />
      {showOverlay && <Overlay />}
    </div>
  )
}

const mapStateToProps = (state) => ({
  ...state,
})

export default connect(mapStateToProps)(Room)
