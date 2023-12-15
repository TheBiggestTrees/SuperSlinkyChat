import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {

  const {currentUser} = useContext(AuthContext)

  return (
    <div className='navbar bg-secondary-focus flex items-center h-[70px]  p-4 justify-between'>
      <span className='logo font-bold hidden md:block '>Super Slinky Chat</span>
      <div className='user flex flex-col items-end'>
        <img className='bg-white h-8 w-8 rounded-full object-cover' src={currentUser.photoURL} alt=''></img>
        <span className='text-accent-content hidden md:flex' >{currentUser.displayName}</span>
      </div>
    </div>
  )
}

export default Navbar
