import React, { useState, useEffect } from "react"
import { connect } from "react-redux"

import DirectChatHeader from "./DirectChatHeader"
import MessagesContainer from "./MessagesContainer"
import NewMessage from "./NewMessage"
import ConversationNotChosen from "./ConversationNotChosen"

const DirectChat = ({ activeConversation, directChatHistory }) => {
  const [messages, setMessages] = useState([])

  // 获取用户的历史记录
  const getDirectChatHistory = (directChatHistory, socketId) => {
    // 是否存在 directChatHistory 或 socketId
    if (!directChatHistory || !socketId) {
      return []
    }

    const history = directChatHistory.find(
      (history) => history.socketId === socketId,
    )

    return history ? history.chatHistory : []
  }

  useEffect(() => {
    setMessages(
      getDirectChatHistory(
        directChatHistory,
        activeConversation ? activeConversation.socketId : null,
      ),
    )
  }, [activeConversation, directChatHistory])

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
