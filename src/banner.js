import React from 'react'
import './banner.css'

function banner() {
  return (
    <header
      className='banner'
      style={{
        backgroundSize: 'cover',
        backgroundImage: `url("https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Black_flag.svg/1280px-Black_flag.svg.png")`,
        backgroundPosition: 'center center',
      }}
    >
      <div className='banner_contents'>
        <h1 className='banner_title'>Movie name</h1>
        <div className='banner_buttons'>
          <button className='banner_button'>Play</button>
          <button className='banner_button'>My list </button>
        </div>
        <h1 className='banner_description'>this is a test description</h1>
      </div>
      <div className='banner--fadeBottom'></div>
    </header>
  )
}

export default banner
