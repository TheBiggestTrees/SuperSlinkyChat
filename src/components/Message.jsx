import React, { useContext, useEffect, useRef } from 'react'
import { ChatContext } from '../context/ChatContext'
import { AuthContext } from '../context/AuthContext'

const Message = ({message}) => {
  const {currentUser} = useContext(AuthContext)
  const {data} = useContext(ChatContext)

  const ref = useRef()

  useEffect(() => {
    ref.current?.scrollIntoView({behavior:'smooth'})
  }, [message])

  return (
    <>
    <div ref={ref} className={`message ${message.senderId === currentUser.uid && 'owner'} max-h-[200px] flex gap-4 border-t-[1px] border-gray-500 pt-4`}>
      <div className="messageInfo flex flex-col text-gray-500 mb-4 items-center">
        <img src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} className='w-12 h-12 rounded-full' alt="" />
        <span>just now</span>
      </div>
      <div className="messageContent max-w-[80%] flex flex-col gap-3 pb-6">
        <p>{message.text}</p>
        {message.img && <img className='w-auto h-[80%]' src={message.img} alt="" />}
      </div>
    </div>
    </>
  )
}

export default Message
