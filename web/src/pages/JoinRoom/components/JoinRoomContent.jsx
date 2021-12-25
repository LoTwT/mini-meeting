import React, { useState } from "react"
import { connect } from "react-redux"

import JoinRoomInputs from "./JoinRoomInputs"
import OnlyWithAudioCheckbox from "./OnlyWithAudioCheckbox"
import { setConnectOnlyWithAudio } from "../../../store/action"
import ErrorMessage from "./ErrorMessage"
import JoinRoomButtons from "./JoinRoomButtons"

const JoinRoomContent = (props) => {
  const { isRoomHost, setConnectOnlyWithAudio, connectOnlyWithAudio } = props

  const [roomIdValue, setRoomIdValue] = useState("")
  const [nameValue, setNameValue] = useState("")

  // 加入房间
  const handleJoinRoom = () => {
    console.log("加入房间成功")
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
      <ErrorMessage errorMessage={"会议 ID 不存在！"} />
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
