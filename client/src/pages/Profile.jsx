import React from 'react'
import './Profile.css'
import { useState ,useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

function Profile() {
  const [myprofile,setmyprofile] =useState([]);
  useEffect(()=>{
      axios.get('http://localhost:5000/myprofile',{
          headers :{
              'x-token': localStorage.getItem('token')
          }
      })
      .then(user=>setmyprofile(user.data))
      .catch(err=>console.log(err))
  },[])
console.log(myprofile);
  return (
   <div className="profile-card">
      <img src={myprofile.image} alt="Profile" />
      <h2>Name : {myprofile.fullname}</h2>
      <p>Email : {myprofile.email}</p>
      <p>{myprofile.skill}</p>
      <Link to={`/edit/${myprofile._id}`}>
        <button>edit</button>
      </Link>
    </div>
  )
}

export default Profile