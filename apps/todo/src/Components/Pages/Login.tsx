import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../../firebase-config';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
// import useAuthState = require('react-firebase-hooks/auth');
import { useAuthState } from 'react-firebase-hooks/auth';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginView, setIsLoginView] = useState(true);
  // const [loggedIn , isLoggedIn] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate('/dashboard');
  }, [user, loading]);

  const handleSignUp = async () => {
    // const emailVal = email;
    // const passwordVal = password;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      window.alert(error);
      // showLoginError(error)
    }
    // window.alert(`Email: ${email} Password: ${password}`);

    setEmail('');
    setPassword('');
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password).then(() => {
        window.location = '/dashboard' as Location | (string & Location);
      });
    } catch (error) {
      window.alert(error);
    }
    console.log(`Email: ${email} Password: ${password}`);
  };

  return (
    <div className="signup">
      <h1>{isLoginView ? 'Login' : 'Sign Up'}</h1>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button
          type="button"
          onClick={isLoginView ? handleLogin : handleSignUp}
        >
          {isLoginView ? 'Login' : 'Sign Up'}
        </button>
        <button onClick={() => setIsLoginView(!isLoginView)}>
          Switch to {isLoginView ? 'Sign Up' : 'Login'}
        </button>
      </div>
    </div>
  );
}
