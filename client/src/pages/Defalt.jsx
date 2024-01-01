import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import './Users.css'
import './Default.css'
import { Link, Navigate } from 'react-router-dom'


function Defalt() {
    const [dis,setDis]=useState(false);
    const [search,setSearch]=useState("");
    const [suser,setsUser] = useState([]);
    const [allusers,setallUsers] =useState([]);
    const [userIds,setuserIds]=useState("")
    useEffect(()=>{
        axios.get('http://localhost:5000/default')
        .then(users=>setallUsers(users.data))
        
        .catch(err=>console.log(err))
    },[])

  
const handleSearch = async (e) =>{
    e.preventDefault();
    // useEffect(()=>{
       await  axios.get(`http://localhost:5000/search/${search}`)
        .then(susers=>setsUser(susers.data)) 
        .catch(err=>console.log(err))
        setDis(true)
    // },[])
}


  return (
    <div className='maindiv'>
        <form className="search" onSubmit={handleSearch}>
        <input type="text" placeholder='enter fullname' onChange={e=>setSearch(e.target.value.toLocaleLowerCase())} />
        <button >Submit</button> 
        </form>
        {dis ?
        suser.length>=1?
              (suser.map((profiles,index) =>
              <div className="profilediv" key={index}>
                  <h1>{profiles.fullname}</h1>
                  <h1>{profiles.email}</h1>
                  <ul>
                      {profiles.skill.split(",").map((skill,id)=>
                          <p key={id}>{skill}</p>
                          )}
                  </ul>
                 
              </div>
              
              )):
              <div className='notfound'>user not found</div>

    : 
    allusers.map((profiles,index) =>
    <div className="profilediv" key={index}>
        <h1>{profiles.fullname}</h1>
        <h1>{profiles.email}</h1>
        <ul>
            {profiles.skill.split(",").map((skill,id)=>
                <p key={id}>{skill}</p>
                )}
        </ul>
        <Link to={`/singleuser/${profiles._id}`}>
            <button>view</button>
        </Link>
        {/* <button onClick={()=>{setuserIds(profiles._id),console.log(profiles._id)}}>view</button> */}
        {/* <button onClick={()=>{to=`/singleuser/:${profiles._id}`}}>view</button> */}
    </div>
    
    )
    }
     {/* <table>
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

        </table> */}
      
    </div>
  )
}

export default Defalt