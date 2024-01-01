import React ,{useState} from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [data,setData] = useState({
        fullname:'',
        email:'',
        mobile:'',
        skill:'',
        password:'',
        confirmpassword:'',
    })

    const changeHandler = e =>{
        setData({...data,[e.target.name]:e.target.value})
    }

  

    const submitHandler = e =>{
        e.preventDefault();
        if(data.fullname.length <=5){
            alert("user name must be greater than 5 char")
        }else if(data.password !== data.confirmpassword){
          alert("password and confirm passwords are not matching")
        }else{
        axios.post('http://localhost:5000/register/',data).then(
            res=>alert(res.data)
        
        )
        navigate('/login')
        }
    }

  return (
    <div>
        <center>
            <form onSubmit={submitHandler} autoComplete="off">
                <h3>Register</h3>
                <input type="text"  onChange={changeHandler}   name= "fullname"  placeholder="User Name"/><br/>
                <input type="email"  onChange={changeHandler}   name= "email"  placeholder="Email"/><br/>
                <input type="mobile"  onChange={changeHandler}   name= "mobile"  placeholder="Email"/><br/>
                <input type="skill"  onChange={changeHandler}   name= "skill"  placeholder="Email"/><br/>
                <input type="password"   onChange={changeHandler}  name= "password"  placeholder="Password"/><br/>
                <input type="password"   onChange={changeHandler}  name= "confirmpassword"  placeholder="ConfirmPassword"/><br/>
                <input type="submit" value ="Register" /><br/>
            </form>
        </center>
    </div>
  )
}

export default Register