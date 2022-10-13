import React from "react";
import TaskDescription from "../task-description";

const Task = ({ descr }) => {
  return (
    <div className="view">
      <input className="toggle" type="checkbox" />
      <label>
        <TaskDescription value={descr} />
      </label>
      <button className="icon icon-edit" />
      <button className="icon icon-destroy" />
    </div>
  );
};

export default Task;
