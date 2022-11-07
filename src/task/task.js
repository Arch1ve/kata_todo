import React, { Component } from 'react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import PropTypes from 'prop-types'

import './task.css'
import Edit from '../edit'

export default class Task extends Component {
  state = {
    editing: false,
    distance: formatDistanceToNow(this.props.date),
    mins: this.props.mins,
    secs: this.props.secs,
    timer: false,
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

  changeTimer = () => {
    if (!this.state.timer) {
      return
    }
    let { mins, secs } = this.state
    if (secs <= 0) {
      if (mins == 0) {
        return
      }
      mins--
      secs = 59
    } else {
      secs--
    }
    this.setState({ mins: mins, secs: secs })
  }

  playTimer = () => {
    this.setState({ timer: true })
  }

  pauseTimer = () => {
    this.setState({ timer: false })
  }

  tick = () => {
    this.setState({ distance: formatDistanceToNow(this.props.date) })
    this.changeTimer()
  }

  render() {
    const { label, onDeleted, onToggleDone, done, changeLabel, id } = this.props
    const { editing, mins, secs } = this.state

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
            <span className="title">{label}</span>
            <span className="description">
              <button className="icon icon-play" onClick={this.playTimer}></button>
              <button className="icon icon-pause" onClick={this.pauseTimer}></button>
              <span className="timer">
                {mins}:{secs}
              </span>
            </span>
            <span className="description">{this.state.distance} ago</span>
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
