import React, { useContext, useState } from 'react'
import { db } from '../firebase';
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import { AuthContext } from '../context/AuthContext';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const Search = () => {

  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const {currentUser} = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, 'users'),
      where('displayName', '==', username)
    );

    try {

      
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data())
      });
    } catch(err) {
      setErr(true)
    }


  };

  const handleKey = e => {
    e.code === "Enter" && handleSearch();
    
  }

  const handleSelect = async () => {
    //check wether the group(chats in firestore) exists, if not create
    const combinedId = 
    currentUser.uid > user.uid 
    ? currentUser.uid + user.uid 
    : user.uid + currentUser.uid

    try {
      const res = await getDoc(doc(db, 'chats', combinedId));

      if(!res.exists()){
        //create a chat in chats collection
        await setDoc(doc(db, 'chats', combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, 'userchats', currentUser.uid), {
          [combinedId+'.userInfo']: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId+'.date']: serverTimestamp()
        });
      
        await updateDoc(doc(db, 'userchats', user.uid), {
          [combinedId+'.userInfo']: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId+'.date']: serverTimestamp()
        });

      }
    } catch(err) {
      setErr(true);
    }

    setUser(null);
    setUsername('')

  }

  return (
    <>
    <div className='search'>
      <div className="searchForUser flex items-center justify-center md:justify-start w-[70px] md:w-72 p-[3px] border-b-[1px] border-b-zinc-700 ">
        <label htmlFor="search">
          <MagnifyingGlassIcon className='w-6'/>
        </label>
          <input value={username} onKeyDown={handleKey} onChange={e=>setUsername(e.target.value)} className='bg-transparent shadow-none text-primary-focus outline-none placeholder-primary-foucs' type="text" placeholder='Search for User...' id="search"></input>
      </div>
    </div>

    {err && <span>No one found</span>}
    {user && <div onClick={handleSelect} className="userChat cursor-pointer border-b-2 border-b-zinc-600 p-2 flex w-full justify-center md:justify-start items-center gap-4 hover:bg-secondary-focus">

    <img className='bg-white h-10 w-10 rounded-full object-cover' src={user.photoURL} alt=''></img>

        <div className="userChatInfo hidden md:block">
            <span className='font-bold'>{user.displayName}</span> 
        </div>

      </div>
      }
    </>
  )
}

export default Search
