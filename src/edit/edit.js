import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Edit = ({ label, id, onLabelSubmitted, stopEditing }) => {
  const [labelState, setLabelState] = useState(label)
  const [oldLabelState] = useState(label)

  const onLabelChange = (e) => {
    setLabelState(e.target.value)
  }

  const onKeyPressed = (e) => {
    if (e.key === 'Enter') {
      const text = labelState || 'Unnamed task'
      onLabelSubmitted(id, text)
      stopEditing()
    }
    if (e.key === 'Escape') {
      setLabelState(oldLabelState)
      stopEditing()
    }
  }

  return (
    <input
      type="text"
      className="edit"
      value={labelState}
      onChange={(e) => onLabelChange(e)}
      onKeyDown={(e) => onKeyPressed(e)}
      autoFocus
    ></input>
  )
}

export default Edit

Edit.defaultProps = {
  onLabelSubmitted: () => {},
  stopEditing: () => {},
}

Edit.propTypes = {
  onLabelSubmitted: PropTypes.func,
  stopEditing: PropTypes.func,
  id: PropTypes.number.isRequired,
}
