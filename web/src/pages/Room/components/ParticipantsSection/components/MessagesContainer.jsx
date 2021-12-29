import React, { useEffect, useRef } from "react"

const SingleMessage = ({ isAuthor, messageContent }) => {
  const messageStyling = isAuthor
    ? "author_direct_message"
    : "receiver_direct_message"

  const containerStyling = isAuthor
    ? "direct_message_container_author"
    : "direct_message_container_receiver"

  return (
    <div className={containerStyling}>
      <p className={messageStyling}>{messageContent}</p>
    </div>
  )
}

const MessagesContainer = ({ messages }) => {
  const scrollRef = useRef()

  // 让元素平滑滚动到窗口的可视区域
  useEffect(() => {
    if (scrollRef) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  return (
    <div className="direct_messages_container">
      {messages.map((message) => (
        <SingleMessage
          key={`${message.messageContent}-${message.identity}`}
          messageContent={message.messageContent}
          identity={message.identity}
          isAuthor={message.isAuthor}
        />
      ))}
      <div ref={scrollRef}></div>
    </div>
  )
}

export default MessagesContainer
