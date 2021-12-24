import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Introduction from "./pages/Introduction/Introduction.jsx"
import JoinRoom from "./pages/JoinRoom/JoinRoom.jsx"
import Room from "./pages/Room/Room.jsx"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Introduction />} />
        <Route path="/join-room" element={<JoinRoom />} />
        <Route path="/room" element={<Room />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
