import React, { useContext } from 'react'
import { Bars3Icon, UserPlusIcon } from '@heroicons/react/24/solid'
import Messages from './Messages'
import { ChatContext } from '../context/ChatContext'
const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
      <div className='chat flex flex-col flex-[4] p-0 m-0'>
        <div className="chatInfo flex items-center h-20 justify-between p-4 bg-secondary w-full">
          <span className='font-bold'>{data.user?.displayName}</span>
          <div className='chatIcons flex gap-3'>
              <UserPlusIcon className='w-[24px] h-[24px] cursor-pointer'/>
              <Bars3Icon className='w-[24px] h-[24px] cursor-pointer' />
          </div>
        </div>
        <Messages />
      </div>
  )
}

export default Chat
