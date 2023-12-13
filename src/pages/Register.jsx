import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import React, { useState } from 'react'
import { PhotoIcon } from '@heroicons/react/24/solid'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { storage, auth, db } from '../firebase'
import { doc, setDoc } from 'firebase/firestore'
import { Link, useNavigate } from "react-router-dom"

const Register = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)

      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on('state_changed', 
        (snapshot) => {
          console.log(snapshot)
        },
        (error) => {
          console.log(error)
        }, 
        () => {getDownloadURL(uploadTask.snapshot.ref)
          .then( async (downloadURL) => {
            await updateProfile(res.user, {
              displayName: displayName,
              photoURL: downloadURL,
            });
           
            await setDoc(doc(db, 'users', res.user.uid), {
              uid: res.user.uid,
              displayName: displayName,
              email: email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, 'userchats', res.user.uid), {});
            navigate('/');

          });
        })

        

    } catch(err) {
      setErr(true);
      console.log(err)
    }
  }

  return (
    <div className='formContainer'>
        <div className='formWrapper bg-secondary p-8 rounded-2xl flex flex-col gap-2 text-center'>
            <span className='logo text-xl font-bold'>Super Slinky Chat</span>
            <span className='title'>Register</span>
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder='username'></input>
                <input type='email' placeholder='email'></input>
                <input type='password' placeholder='password'></input>
                <input style={{display: 'none'}} type='file' id='file'></input>
                <label className='btn' htmlFor='file'>< PhotoIcon className="w-6 h-6 pr-1"/>Profile Picture</label>

                <button className='btn'>Sign Up</button>
                {err && <span>Something Went Wrong</span>}
            </form>
            <p>Already have an account? <Link to='/login'>Login</Link></p>
        </div>
    </div>
  )
}

export default Register
