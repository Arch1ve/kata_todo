import React, { Component } from "react";
import Edit from "../edit";

export default class Task extends Component {
  state = {
    done: false,
    editing: false,
  };

  onDone = () => {
    this.setState(({ done }) => {
      return { done: !done };
    });
  };

  render() {
    const onDeleted = this.props.onDeleted;
    const { label } = this.props.data;
    const { done, editing } = this.state;

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
          <input className="toggle" type="checkbox" />
          <label>
            <span
              className="description"
              onClick={() => {
                this.onDone();
              }}
            >
              {label.charAt(0).toUpperCase() + label.slice(1)}
            </span>
          </label>
          <button className="icon icon-edit" />
          <button className="icon icon-destroy" onClick={onDeleted} />
        </div>
        {editing ? <Edit /> : null}
      </li>
    );
  }
}
