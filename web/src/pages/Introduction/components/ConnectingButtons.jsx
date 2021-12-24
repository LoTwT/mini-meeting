import React from "react"
import { useNavigate } from "react-router-dom"

import ConnectingButton from "./ConnectingButton"

const ConnectingButtons = () => {
  const navigate = useNavigate()

  // 用户加入会议
  const pushToJoinRoom = () => navigate("/join-room")

  // 主持人创建会议
  const pushToJoinRoomAsHost = () => navigate("/join-room?host=true")

  return (
    <div className="connecting_buttons_container">
      <ConnectingButton buttonText="加入会议" onClickHandler={pushToJoinRoom} />
      <ConnectingButton
        buttonText="主持会议"
        onClickHandler={pushToJoinRoomAsHost}
        createRoomButton
      />
    </div>
  )
}

export default ConnectingButtons
