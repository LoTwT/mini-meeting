import React from "react"

import ChatLabel from "./components/ChatLabel"
import Messages from "./components/Messages"
import NewMessage from "./components/NewMessage"

const ChatSection = () => {
  return (
    <div className="chat_section_container">
      <ChatLabel />
      <Messages />
      <NewMessage />
    </div>
  )
}

export default ChatSection
