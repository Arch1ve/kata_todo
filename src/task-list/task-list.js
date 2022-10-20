import React from "react";
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
