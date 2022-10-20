import React, { Component } from "react";
import "./task.css";
import Edit from "../edit";

export default class Task extends Component {
  state = {
    editing: false,
  };

  onEdit = () => {
    this.setState({ editing: true });
  };

  stopEditing = () => {
    this.setState({ editing: false });
  };

  render() {
    const { label, onDeleted, onToggleDone, done, changeLabel, id } =
      this.props;
    const { editing } = this.state;

    let classNames = "";
    if (done) {
      classNames += "completed";
    }
    if (editing) {
      classNames += "editing";
    }

    return (
      <li className={classNames}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={done}
            onChange={onToggleDone}
          />
          <label>
            <span className="description">{label}</span>
          </label>
          <button className="icon icon-edit" onClick={() => this.onEdit()} />
          <button className="icon icon-destroy" onClick={onDeleted} />
        </div>
        {editing ? (
          <Edit
            onLabelSubmitted={changeLabel}
            stopEditing={this.stopEditing}
            label={label}
            id={id}
          />
        ) : null}
      </li>
    );
  }
}
