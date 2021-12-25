import React from "react"

const JoinRoomTitle = ({ isRoomHost }) => {
  const title = isRoomHost ? "主持会议" : "加入会议"
  return <p className="join_room_title">{title}</p>
}

export default JoinRoomTitle
