import React from 'react'
import errorScreenAnime from '../assets/svg/errorScreenAnime.svg'

function ErrorScreen() {
  return (
    <div style={{backgroundImage: `url(${errorScreenAnime})`, backgroundRepeat: 'no-repeat',
    width:'100vw',height:'100vh'}}></div>
  )
}

export default ErrorScreen