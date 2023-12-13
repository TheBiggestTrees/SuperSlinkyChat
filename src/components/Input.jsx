import { PaperAirplaneIcon, PaperClipIcon, PhotoIcon } from '@heroicons/react/24/outline'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { Timestamp, arrayUnion, doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { v4 as uuid } from 'uuid'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';

const Input = () => {

  const [text, setText] = useState('');
  const [img, setImg] = useState(null);

  const {currentUser} = useContext(AuthContext)
  const {data} = useContext(ChatContext)

  const handleKey = e => {
    e.code === "Enter" && handleSend();
  }

  const handleSend = async () => {
    if(img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img)

      uploadTask.on('state_changed', 
        (snapshot) => {
          console.log(snapshot)
        },
        (error) => {
          console.log(error)
        }, 
        () => {getDownloadURL(uploadTask.snapshot.ref)
          .then( async (downloadURL) => {
            await updateDoc(doc(db, 'chats', data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL
              })
            })

          });
        })
    } else {
      await updateDoc(doc(db, 'chats', data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        })
      })


    }

    await updateDoc(doc(db, 'userchats', currentUser.uid), {
      [data.chatId+ '.lastMessage']: {
        text
      },
      [data.chatId+ '.date']: serverTimestamp(),
    })

    await updateDoc(doc(db, 'userchats', data.user.uid), {
      [data.chatId+ '.lastMessage']: {
        text
      },
      [data.chatId+ '.date']: serverTimestamp(),
    })

    setImg(null);
    setText('');
  }
   
  return (
    <div className='h-[50px] p-3 bg-secondary-focus flex items-center gap-3 justify-between'>
      <input value={text} onKeyDown={handleKey} onChange={e => setText(e.target.value)} type="text" className='w-full p-4 h-3 outline-none' placeholder='Type something...' />
      <div className="send flex gap-3">
        <input onChange={e => setImg(e.target.files[0])} type="file" style={{display: 'none'}} id='fileUpload' />
        <label htmlFor='fileUpload' className='h-6 w-6 cursor-pointer'>
          <PaperClipIcon className='h-6 w-6' />
        </label>
        <input type="file" style={{display: 'none'}} id='pictureUpload' />
        <label htmlFor='pictureUpload' className='h-6 w-6 cursor-pointer'>
          <PhotoIcon className='h-6 w-6'/>
        </label>
      
        <button onClick={handleSend}><PaperAirplaneIcon className='h-6 w-6'/></button>
      </div>
    </div>
  )
}

export default Input
