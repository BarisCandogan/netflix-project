import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'
import { auth } from '../firebase'
import Nav from '../Nav'
import './Profilescreen.css'

function Profilescreen() {
  const user = useSelector(selectUser)
  return (
    <div className='profilescreen'>
      <Nav />
      <div className='profilescreen_body'>
        <h1>edit profile</h1>
        <div className='profilescreen_info'>
          <img
            src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'
            alt=''
          />
          <div className='profilescreen_details'>
            <h2>{user.email}</h2>
            <div className='profilescreen_plans'>
              <h3>Plans (Current Plan:premium)</h3>
              <button
                onClick={() => auth.signOut()}
                className='profilescreen_signout'
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profilescreen
