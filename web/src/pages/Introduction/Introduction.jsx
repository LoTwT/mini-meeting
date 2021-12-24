import React from "react"

import "./Introduction.css"
import logo from "../../resources/images/logo.png"
import ConnectingButtons from "./components/ConnectingButtons"

const Introduction = () => {
  return (
    <div className="introduction_page_container">
      <div className="introduction_page_panel">
        <img className="introduction_page_image" src={logo} alt="logo" />
        <ConnectingButtons />
      </div>
    </div>
  )
}

export default Introduction
