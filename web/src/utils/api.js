import axios from "axios"

const serverApi = "http://localhost:1015/api"

export const getRoomExists = async (roomId) => {
  const response = await axios.get(`${serverApi}/room-exists/${roomId}`)
  return response.data
}
