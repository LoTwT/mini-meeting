import React from "react"
import { connect } from "react-redux"

const Participant = (props) => {
  const { identity, lastItem } = props
  return (
    <>
      <p className="participants_paragraph">{identity}</p>
      {!lastItem && <span className="participants_separator_line"></span>}
    </>
  )
}

const Participants = ({ participants }) => {
  return (
    <div className="participants_container">
      {participants.map((participant, index) => (
        <Participant
          key={participant.identity}
          identity={participant.identity}
          lastItem={participants.length === index + 1}
          participant={participant}
        />
      ))}
    </div>
  )
}

const mapStateToProps = (state) => ({
  ...state,
})

export default connect(mapStateToProps)(Participants)
