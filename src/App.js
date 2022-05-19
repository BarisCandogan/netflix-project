import React from 'react'
import HomeScreen from './screens/homeScreen'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './screens/loginscreen'
function App() {
  const user = null
  return (
    <div className='app'>
      <BrowserRouter>
        {!user ? (
          <Login />
        ) : (
          <Routes>
            <Route path='/test' element={<h1>Selam</h1>} />

            <Route path='/' element={<HomeScreen />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  )
}

export default App
