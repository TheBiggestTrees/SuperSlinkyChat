import React from 'react'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'

const Home = () => {
  return (
    <>
    <div className='home flex flex-col'>
      <div className="container overflow-hidden flex max-w-full h-[100vh]">
        <Sidebar />
        <Chat />
      </div>
    </div>
    </>
  )
}

export default Home
