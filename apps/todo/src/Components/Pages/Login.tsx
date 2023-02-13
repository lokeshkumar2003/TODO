import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase-config';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginView, setIsLoginView] = useState(true);

  const handleSignUp = async () => {

    // const emailVal = email;
    // const passwordVal = password;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(`There was an error: ${error}`);
      // showLoginError(error)
    }
    console.log(`Email: ${email} Password: ${password}`);

    setEmail('');
    setPassword('');
  };

  const handleLogin = async() => {
    try{
      await signInWithEmailAndPassword(auth, email, password)
    }
    catch(error){
      console.log(`There was an error:`);
    }
    console.log(`Email: ${email} Password: ${password}`);
  };

  return (
    <div className="signup">
      <h1>{isLoginView ? 'Login' : 'Sign Up'}</h1>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)}/>
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
        </div>
        <div>
          <button type='button' onClick={isLoginView ? handleLogin : handleSignUp}>
                {isLoginView ? 'Login' : 'Sign Up'}
          </button>
          <button onClick={() => setIsLoginView(!isLoginView)}>
            Switch to {isLoginView ? 'Sign Up' : 'Login'}
          </button>
        </div>
    </div>
  );
}

