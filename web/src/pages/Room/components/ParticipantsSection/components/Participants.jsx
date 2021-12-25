import React from "react"

const dummyParticipants = [
  {
    identity: "User1",
  },
  {
    identity: "User2",
  },
  {
    identity: "User3",
  },
  {
    identity: "User4",
  },
]

const Participant = (props) => {
  const { identity, lastItem } = props
  return (
    <>
      <p className="participants_paragraph">{identity}</p>
      {!lastItem && <span className="participants_separator_line"></span>}
    </>
  )
}

const Participants = () => {
  return (
    <div className="participants_container">
      {dummyParticipants.map((participant, index) => (
        <Participant
          key={participant.identity}
          identity={participant.identity}
          lastItem={dummyParticipants.length === index + 1}
          participant={participant}
        />
      ))}
    </div>
  )
}

export default Participants
