// import React, { useState, useEffect } from 'react';
// import { useFirebase, useFirestore } from 'react-redux-firebase';
// import { Button } from "@mantine/core";
// import "./styles.css"
// export default function Home(){
//   const firebase = useFirebase();
//   const firestore = useFirestore();

//   const [todo, setTodo] = useState('');
//   const [todos, setTodos] = useState([]);
//   const [editTodo, setEditTodo] = useState(null);

//   useEffect(() => {
//     if (!firebase.auth().currentUser) {
//       return;
//     }
//     const unsubscribe = firestore
//       .collection('todos')
//       .where('userId', '==', firebase.auth().currentUser.uid)
//       .onSnapshot(snapshot => {
//         const newTodos = snapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data()
//         }));
//         setTodos(newTodos);
//       });
//     return () => unsubscribe();
//   }, [firestore, firebase.auth().currentUser]);

//   function handleSubmit(event) {
//     event.preventDefault();
//     if (!firebase.auth().currentUser) {
//       return;
//     }
//     if (editTodo) {
//       firestore
//         .collection('todos')
//         .doc(editTodo.id)
//         .update({
//           text: todo
//         })
//         .then(() => {
//           setTodo('');
//           setEditTodo(null);
//         });
//     } else {
//       firestore
//         .collection('todos')
//         .add({
//           text: todo,
//           userId: firebase.auth().currentUser.uid
//         })
//         .then(() => {
//           setTodo('');
//         });
//     }
//   }

//   function handleEdit(t) {
//     setTodo(t.text);
//     setEditTodo(t);
//   }

//   function handleDelete(id) {
//     firestore
//       .collection('todos')
//       .doc(id)
//       .delete();
//   }

//   if (!firebase.auth().currentUser) {
//     return <div>Please sign in to access the todo page.</div>;
//   }

//   return(
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={todo}
//           onChange={event => setTodo(event.target.value)}
//         />
//         <button type="submit">
//           {editTodo ? 'Update Todo' : 'Add Todo'}
//         </button>
//       </form>
//       <ul>
//         {todos.map(t => (
//           <li key={t.id}>
//             {t.text}
//             <button onClick={() => handleEdit(t)}>Edit</button>
//             <button onClick={() => handleDelete(t.id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>

//   )
// }
