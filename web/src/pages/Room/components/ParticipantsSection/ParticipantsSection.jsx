import React from "react"

import ParticipantsLabel from "./components/ParticipantsLabel"
import Participants from "./components/Participants"
import DirectChat from "./components/DirectChat"

const ParticipantsSection = () => {
  return (
    <div className="participants_section_container">
      <ParticipantsLabel />
      <Participants />
      <DirectChat />
    </div>
  )
}

export default ParticipantsSection
