import React from "react"
import { connect } from "react-redux"

import { setActiveConversation } from "../../../../../store/action"

const Participant = (props) => {
  const {
    identity,
    lastItem,
    participant,
    setActiveConversationAction,
    socketId,
  } = props

  // 激活私信聊天，获取对象信息
  const handleOpenActiveConversation = () => {
    if (participant.socketId !== socketId) {
      setActiveConversationAction(participant)
    }
  }

  return (
    <>
      <p
        className="participants_paragraph"
        onClick={handleOpenActiveConversation}
      >
        {identity}
      </p>
      {!lastItem && <span className="participants_separator_line"></span>}
    </>
  )
}

const Participants = ({
  participants,
  setActiveConversationAction,
  socketId,
}) => {
  return (
    <div className="participants_container">
      {participants.map((participant, index) => (
        <Participant
          key={participant.identity}
          identity={participant.identity}
          lastItem={participants.length === index + 1}
          participant={participant}
          setActiveConversationAction={setActiveConversationAction}
          socketId={socketId}
        />
      ))}
    </div>
  )
}

const mapStateToProps = (state) => ({
  ...state,
})

const mapActionToProps = (dispatch) => ({
  setActiveConversationAction: (activeConversation) =>
    dispatch(setActiveConversation(activeConversation)),
})

export default connect(mapStateToProps, mapActionToProps)(Participants)
