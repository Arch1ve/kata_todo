import React from "react";
import Task from "../task";
import Edit from "../edit";

const TaskList = ({ data }) => {
  const items = data.map((el) => {
    const { status, id } = el;
    return (
      <li className={status} key={id}>
        <Task descr={status} />
        {status === "editing" ? <Edit /> : null}
      </li>
    );
  });

  return <ul className="todo-list">{items}</ul>;
};

export default TaskList;
