import React from 'react'
import { useAppContext } from '../context/AppContext'

const HomePage = () => {

  const {user} = useAppContext()

  return (
    <div className="h-screen overflow-y-scroll text-white font-sans bg-[url('/bg-img.png')] bg-cover bg-center bg-no-repeat">
      {/*Nav */}
      <nav className='sticky top-0 z-10 flex items-center justify-between px-6 py-4'>
        <div>
          <img src="/logo.svg" alt="Logo" className='size-6' />
          <span className='text-xl font-semibold tracking-tight'>Infinity</span>
        </div>
      </nav>
    </div>
  )
}

export default HomePage
