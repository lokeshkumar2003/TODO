// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Home from '../Components/Pages/Home';
import { Login } from '../Components/Pages/Login';
import SignIn  from '../Components/Pages/SignIn';
import styles from './app.module.css';
import NxWelcome from './nx-welcome';

import {auth} from '../firebase-config'
import { initializeApp } from 'firebase/app';
import Dashboard from '../Components/Pages/Dashboard';



export function App() {
  return (
    <div>
      {/* <BrowserRouter>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/"></Route>
      </Routes>
      </BrowserRouter> */}
      <Dashboard />
    </div>
  );
}

export default App;
