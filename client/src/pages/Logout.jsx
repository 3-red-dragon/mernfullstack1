import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Logout() {
  const navigate = useNavigate()
  const auth = localStorage.getItem('tocken')
  useEffect(()=>{
    if(!auth){
      setTimeout(()=>{
        navigate('/login', { replace: true })
      }, 2000)
    }
  })
  return (
    <div>Loggedout Successful</div>
  )
}

export default Logout