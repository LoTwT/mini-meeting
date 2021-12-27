import React from "react"

import ChatLabel from "./components/ChatLabel"
import Messages from "./components/Messages"

const ChatSection = () => {
  return (
    <div className="chat_section_container">
      <ChatLabel />
      <Messages />
    </div>
  )
}

export default ChatSection
