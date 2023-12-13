import React from 'react'
import Navbar from './Navbar'
import Search from './Search'
import Chats from './Chats'

const Sidebar = () => {
  return (
    <div className='sidebar bg-secondary flex flex-col flex-1'>
      <Navbar />
      <Search />
      <Chats />
    </div>
  )
}

export default Sidebar
