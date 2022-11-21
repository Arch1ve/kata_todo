import React, { useState, useEffect } from 'react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import PropTypes from 'prop-types'

import './task.css'

import Edit from '../edit'

const Task = ({ label, onDeleted, onToggleDone, done, changeLabel, id, date, mins, secs }) => {
  const [editing, setEditing] = useState(false)
  const [distance, setDistance] = useState(formatDistanceToNow(date))
  const [[minutes, seconds], setTime] = useState([mins, secs])
  const [over, setover] = useState(false)
  const [timerOn, setTimerOn] = useState(false)

  const tick = () => {
    setDistance(formatDistanceToNow(date))
    changeTimer()
  }

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000)
    return () => clearInterval(timerID)
  }, [tick])

  const onEdit = () => {
    setEditing(true)
  }

  const stopEditing = () => {
    setEditing(false)
  }

  const changeTimer = () => {
    if (!timerOn || over) {
      return
    }
    if (minutes == 0 && seconds == 0) {
      setover(true)
    } else if (seconds == 0) {
      setTime([minutes - 1, 59])
    } else {
      setTime([minutes, seconds - 1])
    }
  }

  const playTimer = () => {
    setTimerOn(true)
  }

  const pauseTimer = () => {
    setTimerOn(false)
  }

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
            <button className="icon icon-play" onClick={playTimer}></button>
            <button className="icon icon-pause" onClick={pauseTimer}></button>
            <span className="timer">
              {minutes}:{seconds}
            </span>
          </span>
          <span className="description">{distance} ago</span>
        </label>
        <button className="icon icon-edit" onClick={() => onEdit()} />
        <button className="icon icon-destroy" onClick={onDeleted} />
      </div>
      {editing ? <Edit onLabelSubmitted={changeLabel} stopEditing={stopEditing} label={label} id={id} /> : null}
    </li>
  )
}

export default Task

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
  id: PropTypes.string.isRequired,
  date: PropTypes.object,
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  changeLabel: PropTypes.func,
}
