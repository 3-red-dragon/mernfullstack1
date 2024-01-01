import React from 'react'
import {useState} from 'react'
import axios from 'axios'

function ProfileUpload() {
    const [image, setImage] = useState(null);
 
    // const handleImageChange = (e) => {
    //   const file = e.target.files[0];
    //   setImage(file);
    // };
   
    const handleUpload = async () =>{
      if(image){
        const formData =  new FormData();
        formData.append('image',image);
        await axios.post('http://localhost:5000/uploadprofile',formData).then(res=>{
          console.log(res);
        })
      }
    }
   
    return (
      <div>
        <h1>Your Profile Photo</h1>
        <input type="file" accept="image/*" onChange={e=>setImage(e.target.files[0])} />
        <br/>
        <button onClick={handleUpload}>Upload Photo</button>
      </div>
  )
}

export default ProfileUpload