import React, { useState } from "react"
import { connect } from "react-redux"
import { useNavigate } from "react-router-dom"

import JoinRoomInputs from "./JoinRoomInputs"
import OnlyWithAudioCheckbox from "./OnlyWithAudioCheckbox"
import { setConnectOnlyWithAudio } from "../../../store/action"
import ErrorMessage from "./ErrorMessage"
import JoinRoomButtons from "./JoinRoomButtons"
import { getRoomExists } from "../../../utils/api"

const JoinRoomContent = (props) => {
  const navigate = useNavigate()

  const { isRoomHost, setConnectOnlyWithAudio, connectOnlyWithAudio } = props

  const [roomIdValue, setRoomIdValue] = useState("")
  const [nameValue, setNameValue] = useState("")
  const [errorMessage, setErrorMessage] = useState(null)

  // 创建 / 加入房间
  const handleJoinRoom = async () => {
    if (isRoomHost) {
      createRoom()
    } else {
      await joinRoom()
    }
  }

  const joinRoom = async () => {
    const responseData = await getRoomExists(roomIdValue)

    const { roomExists, full } = responseData

    // 房间是否存在
    if (roomExists) {
      // 房间是否满员
      if (full) {
        setErrorMessage("会议房间人数已满，请稍后再试！")
      } else {
        // 进入房间
        navigate("/room")
      }
    } else {
      setErrorMessage("会议房间不存在，请验证您的房间 ID 是否正确！")
    }
  }

  const createRoom = async () => {
    navigate("/room")
  }

  return (
    <>
      <JoinRoomInputs
        roomIdValue={roomIdValue}
        setRoomIdValue={setRoomIdValue}
        nameValue={nameValue}
        setNameValue={setNameValue}
        isRoomHost={isRoomHost}
      />
      <OnlyWithAudioCheckbox
        connectOnlyWithAudio={connectOnlyWithAudio}
        setConnectOnlyWithAudio={setConnectOnlyWithAudio}
      />
      <ErrorMessage errorMessage={errorMessage} />
      <JoinRoomButtons
        isRoomHost={isRoomHost}
        handleJoinRoom={handleJoinRoom}
      />
    </>
  )
}

const mapStateToProps = (state) => ({
  ...state,
})

const mapActionToProps = (dispatch) => ({
  setConnectOnlyWithAudio: (onlyWithAudio) =>
    dispatch(setConnectOnlyWithAudio(onlyWithAudio)),
})

export default connect(mapStateToProps, mapActionToProps)(JoinRoomContent)
