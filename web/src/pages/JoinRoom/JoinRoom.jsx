import React, { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { connect } from "react-redux"
import { setIsRoomHost } from "../../store/action"

const JoinRoom = (props) => {
  const { setIsRoomHostAction } = props

  const search = useLocation().search

  useEffect(() => {
    const isRoomHost = new URLSearchParams(search).get("host")

    if (isRoomHost) {
      // 将主持人的状态保存到 redux 的 store 里
      setIsRoomHostAction(isRoomHost)
    }
  })

  return (
    <div className="join_room_page_container">
      <div className="join_room_page_panel"></div>
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
