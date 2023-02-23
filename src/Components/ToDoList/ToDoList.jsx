import React, { useEffect, useState } from "react";
import { Row, Col, Button, ButtonGroup } from 'react-bootstrap';
import s from './ToDoList.module.css';

function ToDoList({ todo, setTodo }) {

  const [edit, setEdit] = useState(null);
  const [value, setValue] = useState('');
  const [filtered, setFiltered] = useState(todo);

  useEffect(() => {
    setFiltered(todo)
  }, [todo])

  useEffect(() => {
    const storedTodo = localStorage.getItem('todo');
    if (storedTodo) {
      setTodo(JSON.parse(storedTodo));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todo', JSON.stringify(todo));
  }, [todo]); useEffect(() => {
    localStorage.setItem('todo', JSON.stringify(todo));
  }, [todo]);

  function todoFilter(status) {
    if (status === 'all') {
      setFiltered(todo);
    } else {
      const newTodo = [...todo].filter(item => item.status === status);
      setFiltered(newTodo);
    }
  }

  function deleteToDo(id) {
    const confirmed = window.confirm("Are you sure you want to delete this todo item?");
    if (confirmed) {
      const newTodo = [...todo].filter(item => item.id !== id);
      setTodo(newTodo);
      localStorage.setItem('todo', JSON.stringify(newTodo));
    }
  }

  function statusToDo(id) {
    const newTodo = [...todo].filter(item => {
      if (item.id === id) {
        item.status = !item.status
      }
      return item
    })
    setTodo(newTodo)
  }


  function editToDo(id, title) {
    setEdit(id)
    setValue(title)
  }

  function saveToDo(id) {
    const newTodo = [...todo].map(item => {
      if (item.id == id) {
        item.title = value
      }
      return item
    })
    setTodo(newTodo)
    setValue('')
    setEdit(null)
    localStorage.setItem('todo', JSON.stringify(newTodo));
  }

  return (
    <div className={s.taskContainer}>
      <Row>
        <Col className={s.filter}>
          {
            <ButtonGroup aria-label="Basic example" className={s.btns}>
              <Button variant="primary" onClick={() => todoFilter('all')} className={s.btn17}>All</Button>
              <Button variant="primary" onClick={() => todoFilter(true)} className={s.btn17} style={{ marginLeft: "10px" }}>Incompleted</Button>
              <Button variant="primary" onClick={() => todoFilter(false)} className={s.btn17} style={{ marginLeft: "10px" }}>Completed</Button>
            </ButtonGroup>
          }
        </Col>
      </Row>
      <div>
        {
          filtered.map(item => (
            <div key={item.id} className={s.listItems}>
              {
                edit === item.id ?
                  <div>
                    <input value={value} onChange={(e) => setValue(e.target.value)} />
                  </div> :
                  <div className={!item.status ? s.close : ''}>{item.title}</div>
              }
              {
                edit === item.id ?
                  <div>
                    <Button onClick={(() => saveToDo(item.id))}>Save</Button>
                  </div> :
                  <div>
                    <Button className={s.btn17} onClick={() => statusToDo(item.id)}>{item.status ? "Complete" : "Completed"}</Button>
                    <Button className={s.btn17} style={{ marginLeft: "10px" }} onClick={() => editToDo(item.id, item.title)}>Edit</Button>
                    <Button className={s.btn17} style={{ marginLeft: "10px" }} onClick={() => deleteToDo(item.id)}>Delete</Button>
                  </div>
              }
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default ToDoList;