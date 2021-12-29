const Actions = {
  SET_IS_ROOM_HOST: "SET_IS_ROOM_HOST",
  SET_CONNECT_ONLY_WITH_AUDIO: "SET_CONNECT_ONLY_WITH_AUDIO",
  SET_ROOM_ID: "SET_ROOM_ID",
  SET_IDENTITY: "SET_IDENTITY",
  SET_SHOW_OVERLAY: "SET_SHOW_OVERLAY",
  SET_PARTICIPANTS: "SET_PARTICIPANTS",
  SET_MESSAGES: "SET_MESSAGES",
  SET_ACTIVE_CONVERSATION: "SET_ACTIVE_CONVERSATION",
  SET_DIRECT_CHAT_HISTORY: "SET_DIRECT_CHAT_HISTORY",
  SET_SOCKET_ID: "SET_SOCKET_ID",
}

export default Actions

export const setIsRoomHost = (isRoomHost) => ({
  type: Actions.SET_IS_ROOM_HOST,
  isRoomHost,
})

export const setConnectOnlyWithAudio = (onlyWithAudio) => ({
  type: Actions.SET_CONNECT_ONLY_WITH_AUDIO,
  onlyWithAudio,
})

export const setIdentity = (identity) => ({
  type: Actions.SET_IDENTITY,
  identity,
})

export const setRoomId = (roomId) => ({
  type: Actions.SET_ROOM_ID,
  roomId,
})

export const setShowOverlay = (showOverlay) => ({
  type: Actions.SET_SHOW_OVERLAY,
  showOverlay,
})

export const setParticipants = (participants) => ({
  type: Actions.SET_PARTICIPANTS,
  participants,
})

export const setMessages = (messages) => ({
  type: Actions.SET_MESSAGES,
  messages,
})

export const setActiveConversation = (activeConversation) => ({
  type: Actions.SET_ACTIVE_CONVERSATION,
  activeConversation,
})

export const setDirectChatHistory = (directChatHistory) => ({
  type: Actions.SET_DIRECT_CHAT_HISTORY,
  directChatHistory,
})

export const setSocketId = (socketId) => ({
  type: Actions.SET_SOCKET_ID,
  socketId,
})
