import React from "react";
import "./footer.css";
import TasksFilter from "../tasks-filter";

const Footer = ({ todo, clearCompleted, changeDisplay, display }) => {
  const strEnd = String(todo) !== "1" ? "s" : "";

  return (
    <footer className="footer">
      <span className="todo-count">
        {todo} item{strEnd} left
      </span>
      <TasksFilter changeDisplay={changeDisplay} display={display} />
      <button className="clear-completed" onClick={() => clearCompleted()}>
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;
