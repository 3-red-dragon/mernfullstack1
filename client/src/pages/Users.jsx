import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import './Users.css'


function Users() {
    const [allusers,setallUsers] =useState([]);
    useEffect(()=>{
        axios.get('http://localhost:5000/getusers',{
            headers :{
                'x-token': localStorage.getItem('token')
            }
        })
        .then(users=>setallUsers(users.data))
        .catch(err=>console.log(err))
    },[])
  return (
    <div className='maindiv'>
        {allusers.length >= 1 ? 
           allusers.map(profiles =>
            <div className="profilediv">
                <h1>{profiles.fullname}</h1>
                <h1>{profiles.email}</h1>
                <ul>
                    {profiles.skill.split(",").map(skill=>
                        <p>{skill}</p>
                        )}
                </ul>
            </div>
            
            )
        :null}
        <table>
            <thead>
                <tr>
                    <th>
                        Fullname
                    </th>
                    <th>
                        Email
                    </th>
                    <th>
                        Skills
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    allusers.map(user=>{
                    return <tr>
                        <td>{user.fullname}</td>
                        <td>{user.email}</td>
                        <td>{user.skill}</td>
                    </tr>
                    })
                }
            </tbody>

        </table>
      
    </div>
  )
}

export default Users