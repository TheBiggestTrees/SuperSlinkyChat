import React from 'react'
import Navbar from './Navbar'
import Search from './Search'
import Chats from './Chats'

const Sidebar = () => {
  return (
    <div className='sidebar bg-secondary flex flex-col w-[70px] md:w-72 items-center md:items-start'>
      <Navbar />
      <Search />
      <Chats />
    </div>
  )
}

export default Sidebar
