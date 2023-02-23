import Header from './Components/Header/Header';
import AddToDo from './Components/AddToDo/AddToDo';
import ToDoList from './Components/ToDoList/ToDoList';
import { useState } from 'react';
import './global-night-mode.css';
import { Container } from 'react-bootstrap';

function App() {

  const [todo, setTodo] = useState(() => {
    const storedTodo = localStorage.getItem('todo');
    return storedTodo ? JSON.parse(storedTodo) : [];
  });

  return (
    <Container>
      <Header />
      <AddToDo todo={todo} setTodo={setTodo} />
      <ToDoList todo={todo} setTodo={setTodo} />
    </Container>
  );
}

export default App;
