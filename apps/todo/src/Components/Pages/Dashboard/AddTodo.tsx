import React,{useState,useEffect} from "react";
import {db,app} from "../../../firebase-config"
import { collection, addDoc, getDocs } from "firebase/firestore";


type todostype={
  name:"string",
}

export default function AddTodo() {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState <todostype[]>([]);
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
        const newData = querySnapshot.docs.map((doc) => ({...doc.data() }));
        setTodos(newData);
        console.log(todos, newData);
        }
      );


  }


  useEffect(() => {
      FetchData();

  } , []);



  return (
    <div>
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
    </div>
  );
}
