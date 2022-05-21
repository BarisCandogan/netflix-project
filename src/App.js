import React, { useEffect } from 'react'
import HomeScreen from './screens/homeScreen'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './screens/loginscreen'
import { auth } from './firebase'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout, selectUser } from './features/userSlice'
import Profilescreen from './screens/Profilescreen'

function App() {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        )
      } else {
        dispatch(logout())
      }
    })
    return unsubscribe
  }, [dispatch])

  return (
    <div className='app'>
      <BrowserRouter>
        {!user ? (
          <Login />
        ) : (
          <Routes>
            <Route path='/profile' element={<Profilescreen />} />

            <Route path='/' element={<HomeScreen />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  )
}

export default App
