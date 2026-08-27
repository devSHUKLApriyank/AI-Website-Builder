import React from 'react'
import { Routes,Route } from 'react-router-dom'
import AuthPage from './pages/AuthPage'
import HomePage from './pages/HomePage'
import PreviewPage from './pages/PreviewPage'
import BuilderPage from './pages/BuilderPage'
import {GuestLayout , AuthLayout} from './pages/Layout'

const App = () => {
  return (
    <Routes>
      {/*Login Routes */}
        <Route  element={<GuestLayout/>}>
        <Route path ="/login" element={<AuthPage mode="login"/>}/>
        <Route path ="/register" element={<AuthPage mode="register"/>}/>
      </Route>
      {/*Auth Routes */}
      <Route element={<AuthLayout/>}>
        <Route path="/" element={<HomePage/>}/>
        <Route path ="/builder/:id" element={<BuilderPage/>}/>
        <Route path ="/preview/:id" element={<PreviewPage/>}/>
      </Route>
    </Routes>
  )
}

export default App
