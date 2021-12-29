import React, { useState } from "react"
import { connect } from "react-redux"

import DirectChatHeader from "./DirectChatHeader"
import MessagesContainer from "./MessagesContainer"
import NewMessage from "./NewMessage"
import ConversationNotChosen from "./ConversationNotChosen"

const DirectChat = ({ activeConversation, directChatHistory }) => {
  const [messages, setMessages] = useState([])

  return (
    <div className="direct_chat_container">
      <DirectChatHeader activeConversation={activeConversation} />
      <MessagesContainer messages={messages} />
      <NewMessage />
      {!activeConversation && <ConversationNotChosen />}
    </div>
  )
}

const mapStateToProps = (state) => ({
  ...state,
})

export default connect(mapStateToProps)(DirectChat)
