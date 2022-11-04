import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './new-task-form.css'

export default class NewTaskForm extends Component {
  state = {
    label: '',
    mins: '',
    secs: '',
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onMinutesChange = (e) => {
    this.setState({
      mins: e.target.value,
    })
  }

  onSecondsChange = (e) => {
    this.setState({
      secs: e.target.value,
    })
  }

  onSubmit = (e) => {
    if (e.key === 'Enter') {
      const text = this.state.label || 'Unnamed task'
      const secs = +this.state.secs
      const mins = +this.state.mins + Math.floor(secs / 60) || 0
      this.props.onItemAdded(text.charAt(0).toUpperCase() + text.slice(1), mins, secs % 60 || 0)
      this.setState({ label: '', mins: '', secs: '' })
    }
  }

  render() {
    const { label, mins, secs } = this.state
    return (
      <header className="header">
        <h1>todos</h1>
        <form className="new-todo-form" onKeyDown={(e) => this.onSubmit(e)}>
          <input
            className="new-todo"
            placeholder="Task"
            value={label}
            onChange={(e) => {
              this.onLabelChange(e)
            }}
          />
          <input
            className="new-todo-form__timer"
            placeholder="Min"
            value={mins}
            onChange={(e) => {
              this.onMinutesChange(e)
            }}
          />
          <input
            className="new-todo-form__timer"
            placeholder="Sec"
            value={secs}
            onChange={(e) => {
              this.onSecondsChange(e)
            }}
          />
        </form>
      </header>
    )
  }
}

NewTaskForm.defaultProps = {
  onItemAdded: () => {},
}

NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func,
}
