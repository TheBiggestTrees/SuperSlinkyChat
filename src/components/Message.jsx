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
    <div ref={ref} className={`message max-h-fit flex gap-6 border-t-[1px] border-gray-500 pt-4`}>
      <div className="messageInfo flex flex-col text-gray-500 w-[56px] justify-end pb-6">
        <img src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} className='w-12 h-12 rounded-full' alt="" />
      </div>
      <div className="messageContent flex flex-col pb-6">
        
        <p className=' w-56 md:w-[40rem] break-words'>{message.text}</p>
        
        {message.img && <div className='h-auto w-48'><img src={message.img} alt="" /></div>}
        
        <div className='text-xs font-extralight p-0 m-0 text-gray-500' >{message.date.toDate().toLocaleDateString('en-US', { year: '2-digit', month: '2-digit', day: '2-digit' })}</div>

        <div className='text-xs font-extralight p-0 m-0 text-gray-500'>{message.date.toDate().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false, })}</div>
        
      </div>
    </div>
    </>
  )
}

export default Message
