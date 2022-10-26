import React, { Component } from 'react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import PropTypes from 'prop-types'

import './task.css'
import Edit from '../edit'

export default class Task extends Component {
  state = {
    editing: false,
    distance: formatDistanceToNow(this.props.date),
  }

  onEdit = () => {
    this.setState({ editing: true })
  }

  stopEditing = () => {
    this.setState({ editing: false })
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  tick = () => {
    this.setState({ distance: formatDistanceToNow(this.props.date) })
  }

  render() {
    const { label, onDeleted, onToggleDone, done, changeLabel, id } = this.props
    const { editing } = this.state

    let classNames = ''
    if (done) {
      classNames += 'completed'
    }
    if (editing) {
      classNames += 'editing'
    }

    return (
      <li className={classNames}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={done} onChange={onToggleDone} />
          <label>
            <span className="description">{label}</span>
            <span className="created">{this.state.distance} ago</span>
          </label>
          <button className="icon icon-edit" onClick={() => this.onEdit()} />
          <button className="icon icon-destroy" onClick={onDeleted} />
        </div>
        {editing ? <Edit onLabelSubmitted={changeLabel} stopEditing={this.stopEditing} label={label} id={id} /> : null}
      </li>
    )
  }
}

Task.defaultProps = {
  label: 'Unnamed task',
  onDeleted: () => {},
  onToggleDone: () => {},
  changeLabel: () => {},
  done: false,
  date: new Date(),
}

Task.propTypes = {
  label: PropTypes.string,
  done: PropTypes.bool,
  id: PropTypes.number.isRequired,
  date: PropTypes.object,
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  changeLabel: PropTypes.func,
}
