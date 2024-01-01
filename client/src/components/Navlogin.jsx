import React ,{useState} from 'react'
import { Link,NavLink,useNavigate} from 'react-router-dom'
import './Navlogin.css'

function Navlogin() {
    const [menuOpen, setMenuOpen] = useState(false);

    const navigate = useNavigate();
    //const userinfo=JSON.parse(localStorage.getItem('user-info'));
    const usert = localStorage.getItem('token'); 
    function Logout(){
      localStorage.clear();
      navigate('/home')
    
    }
  return (
    <nav>
       <Link to="/home" className="title">Home</Link>
       <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
       </div>
        <ul className={menuOpen ? "open" : ""}>
          {usert ?
          <>
            
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/myprofile">Profile</NavLink></li>
            <li><NavLink to="/getusers">Users</NavLink></li>
            <li><NavLink to="/uploadprofile">DP</NavLink></li>
            <li><NavLink to="/logout" onClick={Logout}>Logout</NavLink></li>
          </>
          :
          <>
            <li><NavLink to='/register'>Register</NavLink></li>
             <li><NavLink to='/login'>Login</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/myprofile">Profile</NavLink></li>
            <li><NavLink to="/getusers">Users</NavLink></li>
            </>
          }
        </ul>
    </nav>
  )
}
export default Navlogin