import React, { Component } from "react";
import "./app.css";
import NewTaskForm from "../new-task-form";
import TaskList from "../task-list";
import Footer from "../footer";

export default class App extends Component {
  maxId = 0;

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      const i = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[i];
      const newItem = { ...oldItem, done: !oldItem.done };
      return {
        todoData: [...todoData.slice(0, i), newItem, ...todoData.slice(i + 1)],
      };
    });
  };

  state = {
    display: "All",
    todoData: [
      this.createTask("Completed task"),
      this.createTask("Editing task"),
      this.createTask("Active task"),
    ],
  };

  createTask(label) {
    return {
      label,
      done: false,
      id: this.maxId++,
      date: new Date(),
    };
  }

  addItem = (text) => {
    const newItem = this.createTask(text);
    this.setState(({ todoData }) => {
      return { todoData: [...todoData, newItem] };
    });
  };

  changeLabel = (id, text) => {
    this.setState(({ todoData }) => {
      const i = todoData.findIndex((el) => el.id === id);
      const copy = { ...todoData[i] };
      copy.label = text;
      copy.date = new Date();
      return {
        todoData: [...todoData.slice(0, i), copy, ...todoData.slice(i + 1)],
      };
    });
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const i = todoData.findIndex((el) => el.id === id);
      return { todoData: [...todoData.slice(0, i), ...todoData.slice(i + 1)] };
    });
  };

  clearCompleted = () => {
    this.setState(({ todoData }) => {
      return { todoData: todoData.filter((el) => !el.done) };
    });
  };

  changeDisplay = (val) => {
    this.setState({ display: val });
  };

  render() {
    const { todoData } = this.state;

    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;

    const filteredData = todoData.filter((el) => {
      switch (this.state.display) {
        case "Active":
          return !el.done;
        case "Completed":
          return el.done;
        default:
          return true;
      }
    });

    return (
      <section className="todoapp">
        <NewTaskForm onItemAdded={this.addItem} />
        <TaskList
          data={filteredData}
          onDeleted={this.deleteItem}
          onToggleDone={this.onToggleDone}
          changeLabel={this.changeLabel}
        />
        <Footer
          todo={todoCount}
          display={this.state.display}
          clearCompleted={this.clearCompleted}
          changeDisplay={this.changeDisplay}
        />
      </section>
    );
  }
}
