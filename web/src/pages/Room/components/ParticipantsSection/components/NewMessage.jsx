import React, { useState } from "react"
import { connect } from "react-redux"

import sendMessageButton from "../../../../../resources/images/sendMessageButton.svg"
import * as wss from "../../../../../utils/wss"

const NewMessage = ({ activeConversation, identity }) => {
  const [message, setMessage] = useState("")

  const handleTextChange = (event) => setMessage(event.target.value)

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault()
      sendMessage()
    }
  }

  const sendMessage = () => {
    // 发送消息
    wss.sendDirectMessage({
      receiverSocketId: activeConversation.socketId,
      identity,
      messageContent: message,
    })
    setMessage("")
  }

  return (
    <div className="new_message_container new_message_direct_border">
      <input
        type="text"
        className="new_message_input"
        value={message}
        onChange={handleTextChange}
        onKeyDown={handleKeyDown}
        placeholder="请输入消息..."
      />
      <img
        className="new_message_button"
        src={sendMessageButton}
        alt="sendMessage"
        onClick={sendMessage}
      />
    </div>
  )
}

const mapStateToProps = (state) => ({
  ...state,
})

export default connect(mapStateToProps)(NewMessage)
