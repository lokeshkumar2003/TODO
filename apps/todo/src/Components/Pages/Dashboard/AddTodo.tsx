import React,{useState,useEffect} from "react";
import {db,app } from "../../../firebase-config"
import { collection, addDoc, getDocs } from "firebase/firestore";
// import firebase from 'firebase/app';
import { getAuth , signOut } from "firebase/auth";

import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from "../../../firebase-config";
import { doc, getDoc } from "firebase/firestore";
// import { useEffect } from 'react';


type todostype={
  name:string,
}



export default function AddTodo() {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState <todostype[]>([]);

  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  // const newData : never[] = [];
  // const Data : string[] = [];
  // let newData = [];

  const handleSubmit = async () => {
    // e.preventDefault();
    if (title !== "") {
      await addDoc(collection(db, "data"), {
        'name':title,
      });
      setTitle("");
    }
  };



  window.addEventListener('load',() => {
    FetchData();
  });

  const FetchData = () => {
     getDocs(collection(db, "data")).then(
      (querySnapshot)=>{
        const newData = querySnapshot.docs.map((doc) => ({ ...doc.data() })) as todostype[]
        setTodos(newData);
        console.log(newData);
        }
      );






  }

  const handleLogout = () => {
      // app.auth.logout();\
      const aut = getAuth();
      signOut(aut).then(() => {
        window.location = '/' as Location | (string & Location);
        // window.alert('Logout Successful')
        window.alert('Logout Successful');


      }).catch((error) => {
        window.alert(error)
      });
  }

  useEffect(() => {
      FetchData();

  } , []);


  // const handleEdit = () => {

  // }


  return (
      <>
            <div className="input_container">
              <input
                type="text"
                placeholder="Enter todo..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="btn_container">
              <button onClick={handleSubmit}>Add</button>
            </div>
            <button onClick={handleLogout}>
              Logout
            </button>
            <h1>List of Tasks</h1>
                {
                  todos.length === 0
                ? <p>Please add some tasks</p>
                  : todos.map(
                    (item) => {
                      return (
                        <div style ={{'display':'flex'}}>
                          <p>{item.name}</p>
                          <button>Edit</button>
                          <button>Delete</button>
                        </div>
                      );
                  })
                }
          </>
  );
}
