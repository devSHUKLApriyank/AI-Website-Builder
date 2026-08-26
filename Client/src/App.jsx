import React from 'react'
import { Routes,Route } from 'react-router-dom'
import AuthPage from './pages/AuthPage'
import {GuestLayout , AuthLayout} from './pages/Layout'

const App = () => {
  return (
    <Routes>
      {/*Login Routes */}
        <Route path="/" element={<GuestLayout/>}>
        <Route path ="login" element={<AuthPage mode="login"/>}/>
        <Route path ="register" element={<AuthPage mode="register"/>}/>
      </Route>
      {/*Auth Routes */}
        <Route path="/" element={<AuthLayout/>}>
        <Route path ="/" element={<AuthPage mode="login"/>}/>
        <Route path ="register" element={<AuthPage mode="register"/>}/>
      </Route>
    </Routes>
  )
}

export default App
