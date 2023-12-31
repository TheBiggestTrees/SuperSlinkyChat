import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

const Chats = () => {

    const [chats, setChats] = useState([]);

    const {currentUser} = useContext(AuthContext);
    const {dispatch} = useContext(ChatContext);

    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, 'userchats', currentUser.uid), (doc) => {
                setChats(doc.data())
            });
    
            return () => {
                unsub();
            };
        }

        currentUser.uid && getChats();
    }, [currentUser.uid]);

    const handleSelect = (u) => {
        dispatch({type:'CHANGE_USER', payload: u})
    }

  return (
    <>
    <div className='chats w-full'>
        {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map(chat => (
        <div key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)} className="userChat cursor-pointer w-full p-2 flex items-center justify-center md:justify-start gap-4 hover:bg-secondary-focus">
            <img className='bg-white h-10 w-10 rounded-full object-cover' src={chat[1].userInfo.photoURL} alt=''></img>
            
            <div className="userChatInfo hidden md:flex flex-col ">
                <span className='font-bold'>{chat[1].userInfo.displayName}</span>
                <p className='text-accent-content w-32 overflow-hidden overflow-ellipsis'>{chat[1].lastMessage?.text}</p>
            </div>

        </div>
        ))}
    </div>
    </>
  )
}

export default Chats
