import React from 'react'
import { useState ,useEffect} from 'react'
import { Link,useNavigate } from "react-router-dom";
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
    const usert = localStorage.getItem('token'); 

    const [data,setData]=useState({
        fullname:'',
        email:'',
        mobile:'',
        skill:'',
        password:'',
        confirmpassword:'',
    })

    const navigate = useNavigate();
    const changeHandler= e =>{
        setData({...data,[e.target.name]:e.target.value})
    }
    const registerUser = (e) =>{
        e.preventDefault();
        axios.post('http://localhost:5000/register',data).then(
            res=>{
                console.log(res.data);
                // alert('Regitration Success')
                toast.success('Registration Success', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
                // navigate('/login');
                setTimeout(() => {
                    navigate('/login')
                  }, 2000)
            }
        ).then(err=>console.log(err))
        console.log(data)
    }
    useEffect(()=>{
        if(usert){
          navigate('/home')
        }
      }) 

  return (
    <div>
        <form onSubmit={registerUser}>
            <label>FullName</label>
            <input type='text' placeholder='Enter name...' name="fullname" onChange={changeHandler}/>
            <label>Email</label>
            <input type='email' placeholder='Enter email...' name="email" onChange={changeHandler} />
            <label>Mobile</label>
            <input type='text' placeholder='Enter mobile...' name="mobile" onChange={changeHandler}/>
            <label>Skill</label>
            <input type='text' placeholder='Enter skills...' name="skill" onChange={changeHandler}/>
            <label>Password</label>
            <input type='password' placeholder='Enter password...' name="password" onChange={changeHandler}/>
            <label>ConfirmPassword</label>
            <input type='password' placeholder='Enter confirm password...' name="confirmpassword" onChange={changeHandler}/>
            <button type='submit'>Submit</button>
        </form>
        <button style={{backgroundColor: "pink"}}><Link to='/login'>Go toLogin</Link></button>
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

export default Register