import React from 'react';

import AddTodo from './AddTodo';
import TodoComponent from './Todo';
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../../../firebase-config';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

const Dashboard: React.FC = () => {
  const [todos, setTodos] = React.useState<Todo[]>([]);

  React.useEffect(() => {
    const q = query(collection(db, 'todos'));
    const unsub = onSnapshot(q, (querySnapshot) => {
      const todosArray: Todo[] = [];
      querySnapshot.forEach((doc) =>
        todosArray.push({
          ...doc.data(),
          id: doc.id,
          title: '',
          completed: false,
        })
      );
      setTodos(todosArray);
    });
    return () => unsub();
  }, []);

  const handleEdit = async (todo: Todo, title: string) => {
    await updateDoc(doc(db, 'todos', todo.id), { title: title });
  };
  const toggleComplete = async (todo: Todo) => {
    await updateDoc(doc(db, 'todos', todo.id), { completed: !todo.completed });
  };
  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, 'todos', id));
  };

  return (
    <div>
      <h2>TODO APPLICATION</h2>
      <AddTodo />
      {todos.map((todo) => (
        <TodoComponent
          key={todo.id}
          todo={todo}
          toggleComplete={toggleComplete}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      ))}
    </div>
  );
};

export default Dashboard;
