import React from 'react'
import {useState} from 'react'

function ProfileUpload1() {
 const [file, setfile] = useState(null);

 const handleUpload1 =(e) =>{
    console.log(file);
    alert("upload success")
 }
  return (
    <div>
      <div className='imageContainer'>
        <form>
          <label htmlFor='uploadImage'>
            <div className='uploadBox'>
              <input type="file" id="uploadImage" />

            </div>
          </label>
        </form>

      </div>

    </div>
  )
}

export default ProfileUpload1