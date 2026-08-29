import React from 'react'
import LoginLeft from '../components/LoginLeft'

const LoginLeft = () => {
  return (
    <div className="hidden lg:flex lg:w-2/5 bg-[url('/bg-Image.png')] bg-cover bg-center bg-no-repeat flex-col justify-between p-12 shrink-0 select-none">
      <div>
        <img src='/logo.svg' alt='logo' className='size-9.5'/>
        <span className='text-4xl font-medium text-white'>Infinity</span>
      </div>
      <div>
        <h2 className='text-3xl text-white font-medium leading-snug mb-3 tracking-tight'>Build your presence on web</h2>
        <p className='text-zinc-300'>
            Describe what your website is about and what you do. This will help your visitors understand your business and what you offer.
        </p>
        <p className='text-zinc-300 text-sm mt-12'>
            Copyright {new Date().getFullYear()} Infinity
        </p>
      </div>
    </div>
  )
}

export default LoginLeft
