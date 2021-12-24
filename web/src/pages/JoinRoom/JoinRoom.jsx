import React, { useEffect } from "react"
import { useLocation } from "react-router-dom"

const JoinRoom = (props) => {
  const search = useLocation().search

  useEffect(() => {
    const isRoomHost = new URLSearchParams(search).get("host")

    if (isRoomHost) {
      // 将主持人的状态保存到 redux 的 store 里
    }
  })

  return (
    <div className="join_room_page_container">
      <div className="join_room_page_panel"></div>
    </div>
  )
}

export default JoinRoom
