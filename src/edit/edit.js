import React, { Component } from "react";

export default class Edit extends Component {
  state = {
    label: this.props.label,
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onEnterPressed = (e) => {
    if (e.key === "Enter") {
      const text = this.state.label || "Unnamed task";
      const { id } = this.props;
      this.props.onLabelSubmitted(id, text);
      this.props.stopEditing();
    }
  };

  render() {
    return (
      <input
        type="text"
        className="edit"
        value={this.state.label}
        onChange={(e) => this.onLabelChange(e)}
        onKeyDown={(e) => this.onEnterPressed(e)}
      ></input>
    );
  }
}
