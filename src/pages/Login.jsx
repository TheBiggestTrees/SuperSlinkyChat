import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../firebase';

const Login = () => {

  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      setErr(true);
    }
  }

  return (
    <div className='formContainer'>
      <div className='formWrapper bg-secondary p-8 rounded-2xl flex flex-col gap-2 text-center'>
        <span className='logo text-xl font-bold'>Super Slinky Chat</span>
        <span className='title'>Login</span>
        <form onSubmit={handleSubmit}>
          <input type='email' placeholder='email'></input>
          <input type='password' placeholder='password'></input>
          <button className='btn'>Sign In</button>
          {err && <span>Something Went Wrong</span>}

        </form>
        <p>No account? <Link to='/register'>Register</Link></p>
      </div>
    </div>
  )};

export default Login