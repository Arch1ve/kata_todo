import React, { Component } from "react";
import "./new-task-form.css";

export default class NewTaskForm extends Component {
  state = {
    label: "",
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    if (e.key === "Enter") {
      const text = this.state.label || "Unnamed task";
      this.props.onItemAdded(text.charAt(0).toUpperCase() + text.slice(1));
      this.setState({ label: "" });
    }
  };

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={this.state.label}
          onChange={(e) => {
            this.onLabelChange(e);
          }}
          onKeyDown={(e) => {
            this.onSubmit(e);
          }}
        />
      </header>
    );
  }
}
