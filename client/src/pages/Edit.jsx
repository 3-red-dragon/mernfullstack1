import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import imageCompression from 'browser-image-compression';

function Edit() {
    let { id } = useParams();
    // const [myprofile, setmyprofile] = useState({});
    const [data,setData]=useState({
        name:'',
        email:'',
        skill:'',
        image:'',
    })
    const changeHandler= e =>{
        setData({...data,[e.target.name]:e.target.value})
    }

    useEffect(() => {
        axios.get('http://localhost:5000/myprofile', {
            headers: {
                'x-token': localStorage.getItem('token')
            }
        })
        .then(user => {
            // setmyprofile(user.data);
            setData({
                name: user.data.fullname,
                email: user.data.email,
                skill: user.data.skill,
                image: user.data.image
            });
        })
        .catch(err => console.log(err));
    }, []);

    const handleUpdateProfile = () => {
        axios.post(`http://localhost:5000/update_profile/${id}`, data)
        .then(()=>toast.success('updated success', {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            })) 
        .catch(err=>console.log(err))
    };
    const [compressedImage, setCompressedImage] = useState('');

  async function compressAndConvertToBase64(event) {
    const file = event.target.files[0];

    // Image compression
    const options = {
      maxSizeMB: 0.1,
    //   maxWidthOrHeight: 1024,
      useWebWorker: true,
      onProgress: (p) => console.log(`Compression Progress: ${p}%`),
    };

    const compressedFile = await imageCompression(file, options);

    // Convert to base64
    const reader = new FileReader();
    reader.readAsDataURL(compressedFile);

    reader.onload = () => {
      const base64Result = reader.result;
      console.log(base64Result); // Log the result here
      setData((prevData) => ({
        ...prevData,
        image: base64Result,
      }));
    };

    reader.onerror = (error) => {
      console.error('Error:', error);
    };
  }

    return (
        <div className="profile-card">
                <label htmlFor="fileInput">
                    <img src={data.image} alt="Profile" />
                    
                </label>
                <input id="fileInput" accept="image/*" type="file" onChange={compressAndConvertToBase64} style={{ display: 'none' }} />
                {compressedImage && <img width={1000} src={compressedImage} alt="Compressed" />}
            <div>
                <p>Name: <input type='text' value={data.name} name='name' onChange={changeHandler} /></p>
                <p>Email: <input type='text' value={data.email}  onChange={changeHandler} /></p>
                <p>Skill: <input type='text' value={data.skill} name='skill' onChange={changeHandler} /></p>
            </div>
            <button onClick={handleUpdateProfile}>Update Profile</button>
            <Link to={'/myprofile'}>
                <button>Back</button>
            </Link>
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
    );
}

export default Edit;
