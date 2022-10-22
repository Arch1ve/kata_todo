import React from "react";
import PropTypes from "prop-types";
import "./task-list.css";
import Task from "../task";

const TaskList = ({ data, onDeleted, onToggleDone, changeLabel }) => {
  const items = data.map((el) => {
    const { id } = el;
    return (
      <Task
        {...el}
        key={id}
        onDeleted={() => onDeleted(id)}
        onToggleDone={() => onToggleDone(id)}
        changeLabel={changeLabel}
      />
    );
  });

  return <ul className="todo-list">{items}</ul>;
};

export default TaskList;

TaskList.defaultProps = {
  data: [],
  onDeleted: () => {},
  onToggleDone: () => {},
  changeLabel: () => {},
};

TaskList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  changeLabel: PropTypes.func,
};
