import React,{useState,useEffect} from "react";
import {db,app } from "../../../firebase-config"
import { collection, addDoc, getDocs, updateDoc , orderBy } from "firebase/firestore";
// import firebase from 'firebase/app';
import { getAuth , signOut } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from "../../../firebase-config";
import { doc, getDoc } from "firebase/firestore";
// import { useEffect } from 'react';
import {
  query,
  onSnapshot,

  deleteDoc,
} from 'firebase/firestore';

type todostype={
  name:string,
  completed: boolean ,
  id:string
}

export default function AddTodo() {
  const [title, setTitle] = useState("");
  const [updatedTitle , setUpdatedTitle] = useState(title);
  const [todos, setTodos] = useState <todostype[]>([]);
  const [checked , setChecked] = useState(false);
  const [edit, setEdit] = useState(false);

  const handleSubmit = async () => {
    // e.preventDefault();
    if (title !== "") {
      await addDoc(collection(db, "data"), {
        'name':title,
        'completed': checked

      });
      setTitle("");
    }
  };

  const handleLogout = () => {
      const aut = getAuth();
      signOut(aut).then(() => {
        window.location = '/' as Location | (string & Location);
        // window.alert('Logout Successful')
        window.alert('Logout Successful');


      }).catch((error) => {
        window.alert(error)
      });
  }


  // const todoList: React.SetStateAction<todostype[]> = [];
  const [todoList, settodoList] = useState<todostype[]>([])


  useEffect(() => {
    const q = query(collection(db, 'data'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data=querySnapshot.docs.map(doc=>({...doc.data(),id:doc.id})) as any[]
      settodoList(data)
      // querySnapshot.forEach((doc) => {
        // return todoList.push({
        //   ...doc.data(),
        //   id: doc.id,
        //   name: doc.data().name,
        //   completed: doc.data().completed,
        // });
      // });
      setTodos(todoList);
      console.log(todoList);
    });
    // return () => unsubscribe();
  }, []);


  // const deleteHandler = () => {

  // }

  const deleteTodo = async (id:string) => {
    await deleteDoc(doc(db, 'data', id));
    setTodos(todos);
    console.log('Deleted successfully')
  };

  const editTask = async () => {
    setEdit(true);
  }

  // const updateTask = async (id:string) => {
  //   await updateDoc(doc(db, 'data',id),{title:title});
  // }

  const updateTask = async(id: string) => {
    const taskDocRef = doc(db, 'data', id)
    try{
      await updateDoc(taskDocRef, {
        name: updatedTitle,
        completed: checked
      });
      setEdit(true);
    } catch (err) {
      alert(err)
    }
  }


  return (
      <>
            <div className="input_container">
              {
                <input
                  type="text"
                  placeholder="Enter todo..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              }
              Completed:
              <input type="checkbox" onChange={(e) => setChecked(e.target.checked)}/>
            </div>
            <div className="btn_container">
              <button onClick={handleSubmit}>Add</button>
            </div>
            <button onClick={handleLogout}>
              Logout
            </button>
            <h1>List of Tasks</h1>
                {
                  todoList.map(
                    (item) => {
                      return (
                        <div style ={{'display':'flex'}} key={item.id}>
                          { edit === true
                          ?
                            <div style ={{'display':'flex'}}  key={item.id}>
                              <input type="text" value={updatedTitle} onChange={(e) => setUpdatedTitle(e.target.value)}/>
                              Completed:
                              <input type="checkbox" onChange={(e) => setChecked(e.target.checked)}/>
                            </div>
                          : <p>{item.name} {checked === true ? <span>--- done</span> : <span>--- not done</span>}</p>
                          }
                          {
                            edit === true
                             ? <>
                                <button onClick={() => updateTask(item.id)}>Save</button>
                                <button onClick={() => setEdit(false)}>Cancel</button>
                                </>
                             : <button onClick={() => editTask()}>Edit</button>
                          }

                          <button onClick={() => deleteTodo(item.id)}>Delete</button>
                        </div>
                      );
                  })
                }
          </>
  );
}
