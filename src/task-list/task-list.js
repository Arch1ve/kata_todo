import React from "react";
import Task from "../task";

const TaskList = ({ data, onDeleted }) => {
  const items = data.map((el) => {
    const { id, ...itemProps } = el;
    return <Task data={itemProps} key={id} onDeleted={() => onDeleted(id)} />;
  });

  return <ul className="todo-list">{items}</ul>;
};

export default TaskList;
