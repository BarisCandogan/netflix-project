import React from 'react'
import './homeScreen.css'
import Nav from './Nav'
import Banner from './banner'

function homeScreen() {
  return (
    <div className='homescreen'>
      <Nav />
      <Banner />
    </div>
  )
}

export default homeScreen
