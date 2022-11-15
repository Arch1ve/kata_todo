import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './new-task-form.css'

const NewTaskForm = ({ onItemAdded }) => {
  const [label, setLabel] = useState('')
  const [mins, setMins] = useState('')
  const [secs, setSecs] = useState('')

  const onLabelChange = (e) => {
    setLabel(e.target.value)
  }

  const onMinutesChange = (e) => {
    setMins(e.target.value)
  }

  const onSecondsChange = (e) => {
    setSecs(e.target.value)
  }

  const onSubmit = (e) => {
    if (e.key === 'Enter') {
      const text = label || 'Unnamed task'
      const seconds = +secs
      const minutes = +mins + Math.floor(seconds / 60) || 0
      onItemAdded(text.charAt(0).toUpperCase() + text.slice(1), minutes, seconds % 60 || 0)
      setLabel('')
      setMins('')
      setSecs('')
    }
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form" onKeyDown={(e) => onSubmit(e)}>
        <input
          className="new-todo"
          placeholder="Task"
          value={label}
          onChange={(e) => {
            onLabelChange(e)
          }}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          value={mins}
          onChange={(e) => {
            onMinutesChange(e)
          }}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          value={secs}
          onChange={(e) => {
            onSecondsChange(e)
          }}
        />
      </form>
    </header>
  )
}

export default NewTaskForm

NewTaskForm.defaultProps = {
  onItemAdded: () => {},
}

NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func,
}
