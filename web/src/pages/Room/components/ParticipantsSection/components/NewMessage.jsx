import React, { useState } from "react"

import sendMessageButton from "../../../../../resources/images/sendMessageButton.svg"

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

export default NewMessage
