const Actions = {
  SET_IS_ROOM_HOST: "SET_IS_ROOM_HOST",
}

export default Actions

export const setIsRoomHost = (isRoomHost) => ({
  type: Actions.SET_IS_ROOM_HOST,
  isRoomHost,
})
