import React from 'react'
import img from "../image/Galaxie.jpg"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from '../firebase';
import { useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../firebase';
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate , Link } from 'react-router-dom';


function Register() {
  const [err , setErr] = useState(false)
  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log(e.target[0].value)
    const displayName = e.target[0].value
    const email = e.target[1].value
    const password = e.target[2].value
    const file = e.target[3].files[0]

  try {
    const res = await createUserWithEmailAndPassword(auth, email, password)

    const storageRef = ref(storage, displayName);
 
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
    (error) => {
       setErr(true)
    }, 
    () => {
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
      await updateProfile(res.user, {
        displayName,
        photoURL:downloadURL,
      })

      await setDoc(doc(db , 'users' , res.user.uid), {
        uid:res.user.uid,
        displayName:displayName,
        email:email,
        photoURL:downloadURL
    })

      await setDoc(doc(db , "userChats" , res.user.uid), {

      })
      navigate("/")
      

      });
  }

);
    }catch(err){
    setErr(true)

}


}

  return (
    <div className='formContainer'>
        <div className='formWrapper'>
            <span className='logo'> Enaldo's chat </span>
            <span className='title'> Register </span>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Display name'/>
                <input type="email" placeholder='email'/>
                <input type="password" placeholder='password'/>
                <input style={{ display: "none" }} type="file" id="file" placeholder='image'/>
                <label htmlFor='file'>
                    <img src={img} alt="img"/>
                    <span>Add an avatar</span>
                </label>
                <button className='hoverbutton'>Sign up</button>
                {err && <span style={{color:"red"}}>Something went wrong</span>}
            </form>
            <p>You do not have an account ? <Link to="/login">Login</Link></p>
        </div>
    </div>
  )
}

export default Register