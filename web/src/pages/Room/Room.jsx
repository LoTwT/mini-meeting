import React from "react"

import "./Room.css"
import ParticipantsSection from "./components/ParticipantsSection"
import VideoSection from "./components/VideoSection"
import ChatSection from "./components/ChatSection"

const Room = () => {
  return (
    <div className="room_container">
      <ParticipantsSection />
      <VideoSection />
      <ChatSection />
    </div>
  )
}

export default Room
