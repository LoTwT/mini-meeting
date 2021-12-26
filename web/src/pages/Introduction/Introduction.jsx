import React, { useEffect } from "react"
import { connect } from "react-redux"

import "./Introduction.css"
import logo from "../../resources/images/logo.png"
import ConnectingButtons from "./components/ConnectingButtons"
import { setIsRoomHost } from "../../store/action"

const Introduction = ({ setIsRoomHostAction }) => {
  useEffect(() => {
    setIsRoomHostAction(false)
  }, [])

  return (
    <div className="introduction_page_container">
      <div className="introduction_page_panel">
        <img className="introduction_page_image" src={logo} alt="logo" />
        <ConnectingButtons />
      </div>
    </div>
  )
}

const mapActionsToProps = (dispatch) => ({
  setIsRoomHostAction: (isRoomHost) => dispatch(setIsRoomHost(isRoomHost)),
})

export default connect(null, mapActionsToProps)(Introduction)
