// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Home from '../Components/Pages/Home';

import SignIn  from '../Components/Pages/SignIn';
import styles from './app.module.css';
import NxWelcome from './nx-welcome';
import {Login} from '../Components/Pages/Login'
import {auth} from '../firebase-config'
import { initializeApp } from 'firebase/app';
import Dashboard from '../Components/Pages/Dashboard';
import AddTodo from '../Components/Pages/Dashboard/AddTodo';



export function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        {/* <Route path="/Home" element={<Home />} /> */}
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<AddTodo />} />
      </Routes>
      </BrowserRouter>
      {/*  */}
    </div>
  );
}

export default App;
