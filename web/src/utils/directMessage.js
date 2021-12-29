import { store } from "../store/store"
import { setDirectChatHistory } from "../store/action"

export const appendNewMessageToChatHistory = (data) => {
  const { isAuthor, receiverSocketId, authorSocketId } = data

  // 根据 isAuthor 的值判断历史记录应该存储在哪个用户 (发送方/接收方) 的历史记录里
  if (isAuthor) {
    // 作为消息的发送方去存储历史记录
    appendMessageToChatHistory(receiverSocketId, data)
  } else {
    // 作为消息的接收方去存储历史记录
    appendMessageToChatHistory(authorSocketId, data)
  }
}

const appendMessageToChatHistory = (userSocketId, data) => {
  // 找到存储在 store 中的历史记录
  const chatHistory = [...store.getState().directChatHistory]

  // 找到其中某个用户的历史记录
  const userChatHistory = chatHistory.find(
    (history) => history.socketId === userSocketId,
  )

  // 验证 userChatHistory 是否存在
  if (userChatHistory) {
    // 如果存在历史记录就将新获取的消息添加进入
    // 创建获取的新会话
    const newDirectMessage = {
      isAuthor: data.isAuthor,
      messageContent: data.messageContent,
      identity: data.identity,
    }

    // 创建新的用户历史记录
    const newUserChatHistory = {
      ...userChatHistory,
      chatHistory: [...userChatHistory.chatHistory, newDirectMessage],
    }

    // 替换用户上一次的历史记录
    const newChatHistory = [
      ...chatHistory.filter((history) => history.socketId !== userSocketId),
      newUserChatHistory,
    ]

    store.dispatch(setDirectChatHistory(newChatHistory))
  } else {
    // 如果历史记录不存在就重新创建该用户的历史记录
    const newUserChatHistory = {
      socketId: userSocketId,
      chatHistory: [
        {
          isAuthor: data.isAuthor,
          messageContent: data.messageContent,
          identity: data.identity,
        },
      ],
    }

    const newChatHistory = [...chatHistory, newUserChatHistory]
    store.dispatch(setDirectChatHistory(newChatHistory))
  }
}
