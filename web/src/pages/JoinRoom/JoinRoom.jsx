import React, { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { connect } from "react-redux"

import "./JoinRoom.css"
import { setIsRoomHost } from "../../store/action"
import JoinRoomTitle from "./components/JoinRoomTitle"
import JoinRoomContent from "./components/JoinRoomContent"

const JoinRoom = (props) => {
  const { setIsRoomHostAction, isRoomHost } = props

  const search = useLocation().search

  useEffect(() => {
    const isRoomHost = new URLSearchParams(search).get("host")

    if (isRoomHost) {
      // 将主持人的状态保存到 redux 的 store 里
      setIsRoomHostAction(isRoomHost)
    }
  }, [])

  return (
    <div className="join_room_page_container">
      <div className="join_room_page_panel">
        <JoinRoomTitle isRoomHost={isRoomHost} />
        <JoinRoomContent />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  ...state,
})

const mapActionsToProps = (dispatch) => ({
  setIsRoomHostAction: (isRoomHost) => dispatch(setIsRoomHost(isRoomHost)),
})

export default connect(mapStateToProps, mapActionsToProps)(JoinRoom)
