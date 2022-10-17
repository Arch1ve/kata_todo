import React, { Component } from "react";
import Header from "../header";
import TaskList from "../task-list";
import Footer from "../footer";

export default class App extends Component {
  maxId = 10;

  state = {
    todoData: [
      { label: "Completed task", id: 1 },
      { label: "Editing task", id: 2 },
      { label: "task", id: 3 },
    ],
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const i = todoData.findIndex((el) => el.id === id);

      return { todoData: [...todoData.slice(0, i), ...todoData.slice(i + 1)] };
    });
  };

  render() {
    return (
      <section className="todoapp">
        <Header />
        <TaskList data={this.state.todoData} onDeleted={this.deleteItem} />
        <Footer />
      </section>
    );
  }
}
