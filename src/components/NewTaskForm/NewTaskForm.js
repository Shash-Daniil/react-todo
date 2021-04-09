import React from 'react';
import PropTypes from 'prop-types';

import './NewTaskForm.css';

export default class NewTaskForm extends React.Component {
  static defaultProps = {
    onAddTask: () => true,
  };

  static propTypes = {
    onAddTask: PropTypes.func,
  };

  constructor() {
    super();
    this.state = {
      label: '',
    };

    this.onLabelChange = (event) => {
      this.setState({
        label: event.target.value,
      });
    };
    this.onSubmit = (event) => {
      const { label } = this.state;
      const { onAddTask } = this.props;
      event.preventDefault();
      onAddTask(label);
      this.setState({ label: '' });
    };
  }

  render() {
    const { label } = this.state;

    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.onSubmit}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.onLabelChange}
            value={label}
          />
        </form>
      </header>
    );
  }
}
