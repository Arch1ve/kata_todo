import React, { useState } from 'react'
import { v4 } from 'uuid'

import './app.css'
import NewTaskForm from '../new-task-form'
import TaskList from '../task-list'
import Footer from '../footer'

const App = () => {
  const [display, setDisplay] = useState('All')
  const [todoData, setTodoData] = useState([
    createTask('Completed task'),
    createTask('Editing task'),
    createTask('Active task'),
  ])

  const onToggleDone = (id) => {
    setTodoData((todoData) => {
      const i = todoData.findIndex((el) => el.id === id)
      const oldItem = todoData[i]
      const newItem = { ...oldItem, done: !oldItem.done }
      return [...todoData.slice(0, i), newItem, ...todoData.slice(i + 1)]
    })
  }

  function createTask(label, mins = 1, secs = 30) {
    return {
      label,
      done: false,
      id: v4(),
      date: new Date(),
      mins: mins,
      secs: secs,
    }
  }

  const addItem = (text, mins, secs) => {
    const newItem = createTask(text, mins, secs)
    setTodoData((todoData) => {
      return [...todoData, newItem]
    })
  }

  const changeLabel = (id, text) => {
    setTodoData((todoData) => {
      const i = todoData.findIndex((el) => el.id === id)
      const copy = { ...todoData[i] }
      copy.label = text
      copy.date = new Date()
      return [...todoData.slice(0, i), copy, ...todoData.slice(i + 1)]
    })
  }

  const deleteItem = (id) => {
    setTodoData((todoData) => {
      const i = todoData.findIndex((el) => el.id === id)
      return [...todoData.slice(0, i), ...todoData.slice(i + 1)]
    })
  }

  const clearCompleted = () => {
    setTodoData((todoData) => {
      return todoData.filter((el) => !el.done)
    })
  }

  const changeDisplay = (val) => {
    setDisplay(val)
  }

  const doneCount = todoData.filter((el) => el.done).length
  const todoCount = todoData.length - doneCount

  const filteredData = todoData.filter((el) => {
    switch (display) {
      case 'Active':
        return !el.done
      case 'Completed':
        return el.done
      default:
        return true
    }
  })

  return (
    <section className="todoapp">
      <NewTaskForm onItemAdded={addItem} />
      <TaskList data={filteredData} onDeleted={deleteItem} onToggleDone={onToggleDone} changeLabel={changeLabel} />
      <Footer todo={todoCount} display={display} clearCompleted={clearCompleted} changeDisplay={changeDisplay} />
    </section>
  )
}

export default App
