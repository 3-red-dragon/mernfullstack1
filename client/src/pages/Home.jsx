import React from 'react'
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const userinfo=JSON.parse(localStorage.getItem('user-info'));
  const usert = localStorage.getItem('token'); 
  function Logout(){
    localStorage.clear();
    navigate('/register')
  
  }
  


  return (
    <div> 
     {
     usert ?
      <>
      <h1>Home</h1>
      <h1>{userinfo.email}</h1>
      <button onClick={Logout}>logout</button>
      </>
      :
      <>
      <h1>Please Register/Login</h1>
      </>
  }
       
    </div>
   
  )
}

export default Home