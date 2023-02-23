import React, { useState } from "react";
import { v4 as uuid } from 'uuid';
import { Row, Col, Button, FormControl } from 'react-bootstrap';
import s from './AddToDo.module.css';
import { motion } from 'framer-motion';

function AddToDo({ todo, setTodo }) {

  const [value, setValue] = useState('')
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const formVariants = {
    hidden: {
      opacity: 0,
      y: -20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  function addToDo() {
    if (value) {
      const newTodo = {
        id: uuid(),
        title: value,
        status: true
      };
      const updatedTodo = [...todo, newTodo];
      setTodo(updatedTodo);
      localStorage.setItem('todo', JSON.stringify(updatedTodo));
      setValue('');
    } else {
      alert('Please enter a task');
    }
  }

  return (
    <Row>
      <Col className={s.todoForm}>
        {showForm ? (
          <motion.div variants={formVariants} initial="hidden" animate="visible" style={{ display: "flex" }}>
            <FormControl
              placeholder="Enter the task"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className={s.formInput}
            />
            <Button className={s.btn17} variant="outline-secondary" onClick={addToDo}>
              Add Task
            </Button>
          </motion.div>
        ) : (
          <motion.div variants={formVariants} initial="hidden" animate="visible">
            <Button className={s.btn17} variant="outline-secondary" onClick={toggleForm}>
              Add a Task
            </Button>
          </motion.div>
        )}
      </Col>
    </Row>
  )
}

export default AddToDo;