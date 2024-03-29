import React, { useRef } from 'react'
import { auth } from '../firebase'
import './SignupScreen.css'

function SignupScreen() {
  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  const register = (e) => {
    e.preventDefault()
    auth
      .createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authuser) => {})
      .catch((error) => {
        alert(error.message)
      })
  }
  const signIn = (e) => {
    e.preventDefault()

    auth
      .signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authuser) => {})
      .catch((error) => {
        alert(error.message)
      })
  }
  return (
    <div className='signupscreen'>
      <form>
        <h1>Sign In</h1>
        <input ref={emailRef} type='email' placeholder='E-mail' />
        <input ref={passwordRef} type='password' placeholder='Password' />
        <button type='submit' onClick={signIn}>
          Sıgn In
        </button>
        <h4>
          New to Netflix ?<span onClick={register}> Sign up Now.</span>
        </h4>
      </form>
    </div>
  )
}

export default SignupScreen
