import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './new-task-form.css'

export default class NewTaskForm extends Component {
  state = {
    label: '',
    mins: 0,
    secs: 0,
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onMinutesChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onSubmit = (e) => {
    if (e.key === 'Enter') {
      const text = this.state.label || 'Unnamed task'
      this.props.onItemAdded(text.charAt(0).toUpperCase() + text.slice(1))
      this.setState({ label: '', mins: 0, secs: 0 })
    }
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form className="new-todo-form" onKeyDown={(e) => this.onSubmit(e)}>
          <input
            className="new-todo"
            placeholder="Task"
            value={this.state.label}
            onChange={(e) => {
              this.onLabelChange(e)
            }}
          />
          <input className="new-todo-form__timer" placeholder="Min" />
          <input className="new-todo-form__timer" placeholder="Sec" />
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
