import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link,useNavigate } from "react-router-dom";
import './Login.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Login({handleEmail}) {

  
  const usert = localStorage.getItem('token'); 
  const navigate = useNavigate();

    const [data,setData]=useState({
        email:'',
        password:'',
    })

    const changeHandler= e =>{
      setData({...data,[e.target.name]:e.target.value})
  }

    const loginUser = (e) =>{
        e.preventDefault();
        axios.post('http://localhost:5000/login',data).then(
       res=>{
    
        localStorage.setItem('user-info',res.config.data);
        localStorage.setItem('token',res.data.token);
        // alert("Login Success")
        toast.success('Login Success', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
          if(localStorage.getItem('token')){
            //const usermail=data.email;
            //handleEmail(usermail);
            // navigate('/home')
            setTimeout(() => {
              navigate('/home')
            }, 2000)
          } 
        } 

      ).catch(err=>{
        console.log("Checkpoint 1")
        if(err.response.status === 400){
          // alert("Invalid User")
          toast.error('inavlid user', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
        }else{
          // alert("Invalid credentials")
          toast.error('wrong password', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
        }
        console.log(err)})
        
    }

    useEffect(()=>{
      if(usert){
        navigate('/home')
      }
    }) 

  return (
    <div>

            <form onSubmit={loginUser}> 
            <label>Email</label>
            <input type='email' placeholder='Enter email...' id="email" name="email" onChange={changeHandler} />
            <label>Password</label>
            <input type='password' placeholder='Enter password...' id="password" name="password" onChange={changeHandler}/>
            <button type='submit' >Submit</button>
            
        </form>
        <button style={{backgroundColor: "pink"}}><Link to='/register'> Go to Register</Link></button>
        <br/>
        {/* <button onClick={notify}>Notify!</button> */}
            <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            />
    </div>
  )
}

export default Login