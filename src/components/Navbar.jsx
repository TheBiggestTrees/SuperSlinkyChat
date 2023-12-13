import { signOut } from 'firebase/auth'
import React, { useContext } from 'react'
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {

  const {currentUser} = useContext(AuthContext)

  return (
    <div className='navbar bg-secondary-focus flex items-center h-20 p-4 justify-between'>
      <span className='logo font-bold'>Super Slinky Chat</span>
      <div className='user flex gap-3'>
        <img className='bg-white h-8 w-8 rounded-full object-cover' src={currentUser.photoURL} alt=''></img>
        <span>{currentUser.displayName}</span>
        <button onClick={() => signOut(auth)} className='btn btn-xs btn-accent'>Logout</button>
      </div>
    </div>
  )
}

export default Navbar
