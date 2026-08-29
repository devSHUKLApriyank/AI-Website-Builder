import React, { useState } from 'react'
import LoginLeft from '../components/LoginLeft'

const AuthPage = ({ mode }) => {

  const [error, seterror] = useState("")
  const [loading , setLoading] = useState(false)

  const isLogin = mode === "login"

  return (
    <div className='min-h-screen bg-white flex text-zinc-900 font-sans'>
      {/*Left Panel - Branding */}
      <LoginLeft />

      {/*Right Panel - Branding */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <div className='mb-10'>
            <h1 className='text-3xl font-medium tracking-tight text-zinc-900 mb-1.5 font-sans'>{isLogin ? "Sign in":"Create an account"}</h1>
            <p className='text-sm text-zinc-400'>
              {isLogin ? "Enter your credentials to access your website buider.":"Get started by entering your registration details."}
              </p>
          </div>

          {error && <div className='mb-6 p-3 border border-blue-200 bg-blue-50 text-blue-700 text-xs rounded'>{error}</div>}

          <form action="">

          </form>

          <p>
            {isLogin ?(
              <>
New to Infinity?{" "}
<Link to="/register" className="text-zinc-900 font-medium hover:underline">
                  Create an account
                </Link>
              </>
            ):(
              <>
              Alreaddy have an account?{""}
              </>
            )}
          </p>
        </div>
      </div>

    </div>
  )
}

export default AuthPage
