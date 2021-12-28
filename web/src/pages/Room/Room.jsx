import React, { useEffect } from "react"
import { connect } from "react-redux"

import "./Room.css"
import ParticipantsSection from "./components/ParticipantsSection/ParticipantsSection"
import VideoSection from "./components/VideoSection/VideoSection"
import ChatSection from "./components/ChatSection/ChatSection"
import RoomLabel from "./components/RoomLabel"
import * as webRTCHandler from "../../utils/webRTCHandler"
import Overlay from "./components/Overlay"

const Room = ({
  isRoomHost,
  identity,
  roomId,
  showOverlay,
  connectOnlyWithAudio,
}) => {
  useEffect(() => {
    // 路由守卫
    if (!isRoomHost && !roomId) {
      const siteUrl = window.location.origin
      window.location.href = siteUrl
    }

    webRTCHandler.getLocalPreviewAndInitRoomConnection(
      isRoomHost,
      identity,
      roomId,
      connectOnlyWithAudio,
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
