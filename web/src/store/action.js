const Actions = {
  SET_IS_ROOM_HOST: "SET_IS_ROOM_HOST",
  SET_CONNECT_ONLY_WITH_AUDIO: "SET_CONNECT_ONLY_WITH_AUDIO",
  SET_ROOM_ID: "SET_ROOM_ID",
  SET_IDENTITY: "SET_IDENTITY",
  SET_SHOW_OVERLAY: "SET_SHOW_OVERLAY",
  SET_PARTICIPANTS: "SET_PARTICIPANTS",
  SET_MESSAGES: "SET_MESSAGES",
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
