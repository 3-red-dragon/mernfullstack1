import './App.css'
import { Routes , Route } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Navlogin from './components/Navlogin'
import axios from 'axios';
import About   from './pages/About'
import PrivateRoutes from './components/PrivateRoutes'
import Profile from './pages/Profile'
import Logout from './pages/Logout'
import Users  from  './pages/Users'
import Profileupload from './components/ProfileUpload'
import Profileupload1 from './components/ProfileUpload1'
import Defalt from './pages/Defalt'
import Toastify from './components/Toastify'
import { SingleUser } from './pages/SingleUser'
import Edit from './pages/Edit'
import Image from './pages/Image'
import Compressor from './pages/Compressor'

//axios.defaults.baseURL='http://localhost:5000/'

function App() {
  const usert = localStorage.getItem('token'); 
 // const [email,setemail] = useState();

/* const handleEmail =(userEmail)=>{
     setemail(userEmail);
}*/
  return (
    <>
    <Navlogin/>
    <Routes>
    <Route path='/' element={<Defalt />}  />
     <Route path='/home' element={<Defalt />}  />
      <Route path='/register' element={<Register/>}  />
      <Route path='/login' element={<Login />}  />
      <Route path='/about' element={<PrivateRoutes><About/></PrivateRoutes>}/>
      <Route path='/myprofile' element={<PrivateRoutes><Profile/></PrivateRoutes>}/>
      <Route path='/logout' element={<Logout />}  />
      <Route path='/getusers' element={<Users />}  />
      <Route path='/uploadprofile' element={<PrivateRoutes>< Profileupload/></PrivateRoutes>}  />
      <Route path='/uploadprofile1' element= { < Profileupload1/>}/>
      <Route path='/toast' element= { < Toastify/>}/>
      <Route path='/singleuser/:id' element= { < SingleUser/>}/>
      <Route path='/edit/:id' element= { <Edit/>}/>
      <Route path='/image' element={<Image/>}/>
      <Route path='/compress' element={<Compressor/>}/>

    </Routes>
    </>
  )
}

export default App
