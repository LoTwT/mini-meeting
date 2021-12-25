import React from "react"
import { connect } from "react-redux"

import "./Room.css"
import ParticipantsSection from "./components/ParticipantsSection/ParticipantsSection"
import VideoSection from "./components/VideoSection/VideoSection"
import ChatSection from "./components/ChatSection/ChatSection"
import RoomLabel from "./components/RoomLabel"

const Room = ({ roomId }) => {
  return (
    <div className="room_container">
      <ParticipantsSection />
      <VideoSection />
      <ChatSection />
      <RoomLabel roomId={roomId} />
    </div>
  )
}

const mapStateToProps = (state) => ({
  ...state,
})

export default connect(mapStateToProps)(Room)
