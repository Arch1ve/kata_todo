import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './tasks-filter.css'

export default class TasksFilter extends Component {
  render() {
    const { changeDisplay, display } = this.props
    const selectedAll = display === 'All' ? 'selected' : ''
    const selectedActive = display === 'Active' ? 'selected' : ''
    const selectedCompleted = display === 'Completed' ? 'selected' : ''
    return (
      <ul className="filters">
        <li>
          <button className={selectedAll} onClick={() => changeDisplay('All')}>
            All
          </button>
        </li>
        <li>
          <button className={selectedActive} onClick={() => changeDisplay('Active')}>
            Active
          </button>
        </li>
        <li>
          <button className={selectedCompleted} onClick={() => changeDisplay('Completed')}>
            Completed
          </button>
        </li>
      </ul>
    )
  }
}

TasksFilter.defaultProps = {
  display: 'All',
  changeDisplay: () => {},
}

TasksFilter.propTypes = {
  display: PropTypes.string,
  changeDisplay: PropTypes.func,
}
