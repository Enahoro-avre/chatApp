import React from 'react'
import Cam from "../image/Cam.jpg"
import add from "../image/add.jpg"
import more from "../image/more.jpg"
import Messages from './Messages'
import Input from './Input'
import { useContext } from 'react'
import { ChatContext } from '../context/ChatContext'

function Chat() {

  const { data } = useContext(ChatContext)

  return (
    <div className='chat'>
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <img src={Cam} alt="" />
          <img src={add} alt="" />
          <img src={more} alt="" />
        </div>
      </div>
      <Messages/>
      <Input/>

    </div>
  )
}

export default Chat