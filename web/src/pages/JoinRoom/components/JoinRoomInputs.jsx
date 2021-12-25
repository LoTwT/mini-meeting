import React from "react"

const MyInput = ({ value, placeholder, changeHandler }) => (
  <input
    className="join_room_input"
    value={value}
    placeholder={placeholder}
    onChange={changeHandler}
  />
)

const JoinRoomInputs = (props) => {
  const { roomIdValue, setRoomIdValue, nameValue, setNameValue, isRoomHost } =
    props

  const handleRoomIdValueChange = (event) => {
    setRoomIdValue(event.target.value)
  }

  const handleNameValueChange = (event) => {
    setNameValue(event.target.value)
  }

  return (
    <div className="join_room_inputs_container">
      <MyInput
        value={nameValue}
        placeholder="请输入您的姓名..."
        changeHandler={handleNameValueChange}
      />

      {!isRoomHost && (
        <MyInput
          value={roomIdValue}
          placeholder="请输入会议 ID 号..."
          changeHandler={handleRoomIdValueChange}
        />
      )}
    </div>
  )
}

export default JoinRoomInputs
