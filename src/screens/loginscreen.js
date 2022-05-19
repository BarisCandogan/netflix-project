import React, { useState } from 'react'
import './loginscreen.css'

function Loginscreen() {
  const [signIn, SetsignIn] = useState(false)
  return (
    <div className='loginscreen'>
      <div className='logincreen_background'>
        <img
          className='loginscreen_logo'
          src='https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png'
          alt=''
        />

        <button onClick={() => SetsignIn(true)} className='loginscreen_button'>
          Sign in
        </button>
        <div className='loginscreen_gradient' />
      </div>
      <div className='loginscreen_body'>
        <>
          <h1>Unlimited films,TV programmes and more.</h1>
          <h2>Watch anywhere cancel anytime</h2>
          <h3>
            Ready to watch? Enter your email to create or restart your
            membership
          </h3>
          <div className='loginscreen_input'>
            <form>
              <input type='email' placeholder='E-mail Adress' />
              <button
                onClick={() => SetsignIn(true)}
                className='loginscreen_getstarted'
              >
                GET STARTED
              </button>
            </form>
          </div>
        </>
      </div>
    </div>
  )
}

export default Loginscreen
