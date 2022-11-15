import React , { useState }from 'react'
import { useNavigate , Link } from 'react-router-dom'
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from "firebase/auth";


function Login() {


  const [err , setErr] = useState(false)
  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log(e.target[0].value)
    const email = e.target[0].value
    const password = e.target[1].value

    
    try{
      await signInWithEmailAndPassword(auth, email, password)
      navigate("/")
    }catch(err){
      setErr(true)
    }
  }

    

  return (
    <div className='formContainer'>
        <div className='formWrapper'>
            <span className='logo'> Enaldo's chat </span>
            <span className='title'> Login </span>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder='email'/>
                <input type="password" placeholder='password'/>
                <button className='hoverbutton'>Login</button>
            </form>
            <p>You don't have an account ? <Link to="/register">Register</Link></p>
            {err && <span style={{color:"red"}}>Something went wrong</span>}
        </div>
    </div>
  )
}

export default Login