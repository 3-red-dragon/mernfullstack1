import React from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'

export const SingleUser = () => {
    let {id}=useParams()
    const [User,setsUser]=useState([])
        useEffect(()=>{
        //  e.preventDefault();
            axios.get(`http://localhost:5000/singleuser/${id}`)
            .then(susers=>setsUser(susers.data)) 
            .catch(err=>console.log(err))
        },[])
  return (
    <div>
         <h1>{User.fullname}</h1>
        <h1>{User.email}</h1>
        <ul>
            {User.skill && User.skill.split(",").map((skill,id)=>
                <p key={id}>{skill}</p>
                )}
        </ul>
    </div>
  )
}
