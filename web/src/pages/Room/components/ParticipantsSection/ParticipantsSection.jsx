import React from "react"

import ParticipantsLabel from "./components/ParticipantsLabel"
import Participants from "./components/Participants"

const ParticipantsSection = () => {
  return (
    <div className="participants_section_container">
      <ParticipantsLabel />
      <Participants />
    </div>
  )
}

export default ParticipantsSection
