import React from "react"

const messages = [
  {
    content: "变革的时机已经到来",
    identity: "刻晴",
    messageCreatedByMe: true,
  },
  {
    content: "剑光如我，斩尽牛杂",
    identity: "刻晴",
    messageCreatedByMe: true,
  },
  {
    content: "你愿意陪我一起加班吗",
    identity: "甘雨",
    messageCreatedByMe: false,
  },
  {
    content: "天命既定",
    identity: "莫娜",
    messageCreatedByMe: false,
  },
]

const Message = ({ author, content, sameAuthor, messageCreatedByMe }) => {
  const alignClass = messageCreatedByMe
    ? "message_align_right"
    : "message_align_left"

  const authorText = messageCreatedByMe ? "我" : author

  const contentStyles = messageCreatedByMe
    ? "message_right_styles"
    : "message_left_styles"

  return (
    <div className={`message_container ${alignClass}`}>
      {!sameAuthor && <p className="message_title">{authorText}</p>}
      <p className={`message_content ${contentStyles}`}>{content}</p>
    </div>
  )
}

const Messages = () => {
  return (
    <div className="messages_container">
      {messages.map((message, index) => {
        const sameAuthor =
          index > 0 && message.identity === messages[index - 1].identity

        return (
          <Message
            key={`${message.content}${index}`}
            author={message.identity}
            content={message.content}
            sameAuthor={sameAuthor}
            messageCreatedByMe={message.messageCreatedByMe}
          />
        )
      })}
    </div>
  )
}

export default Messages
