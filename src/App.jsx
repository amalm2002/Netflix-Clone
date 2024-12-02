import React, { useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './context/AuthContext'

import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Player from './pages/Player/Player'

const App = () => {

  const navigate = useNavigate()
  const location = useLocation()
  const { user, loginUser, logoutUser } = useAuth()

  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        console.log('Logged In');
        loginUser(currentUser)
        if (location.pathname === '/login') {
          navigate('/')
        }
      } else {
        
        console.log('Logged Out');
        logoutUser()
        if (location.pathname !== '/login') {
          navigate('/login')
        }
      }
    })
  }, [loginUser, logoutUser, navigate, location.pathname])

  return (
    <div>
      <ToastContainer theme='dark' />
      <Routes>
        <Route path='/' element={user ? <Home /> : <Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/player/:id' element={<Player />} />
      </Routes>
    </div>
  )
}

export default App
