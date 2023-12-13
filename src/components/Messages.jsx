import React, { useContext, useEffect, useState } from 'react'
import Message from './Message'
import Input from './Input'
import { ChatContext } from '../context/ChatContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages)
    })

    return () => {
      unsub();
    }
  }, [data.chatId])


  
  return (
    <>
    <div className='messages flex overflow-y-scroll flex-col h-[100%] p-4'>
      {messages.map((m) => {
        return <Message message={m} key={m.id} />
      })}
    </div>
      <Input />
    </>
  )
}

export default Messages
