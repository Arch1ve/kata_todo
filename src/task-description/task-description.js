import React from "react";

const TaskDescription = ({ value }) => {
  return (
    <span className="description">
      {value.charAt(0).toUpperCase() + value.slice(1)} task
    </span>
  );
};

export default TaskDescription;
