import React from "react"
import { useNavigate } from "react-router-dom"

const MyButton = ({ buttonText, cancelButton = false, onClickHandler }) => {
  const buttonClass = cancelButton
    ? "join_room_cancel_button"
    : "join_room_success_button"

  return (
    <button className={buttonClass} onClick={onClickHandler}>
      {buttonText}
    </button>
  )
}

const JoinRoomButtons = ({ handleJoinRoom, isRoomHost }) => {
  const navigate = useNavigate()

  const successButtonText = isRoomHost ? "主持" : "加入"

  // 返回到 Introduction
  const pushToIntroduction = () => navigate("/")

  return (
    <div className="join_room_buttons_container">
      <MyButton
        buttonText={successButtonText}
        onClickHandler={handleJoinRoom}
      />

      <MyButton
        buttonText="取消"
        cancelButton
        onClickHandler={pushToIntroduction}
      />
    </div>
  )
}

export default JoinRoomButtons
