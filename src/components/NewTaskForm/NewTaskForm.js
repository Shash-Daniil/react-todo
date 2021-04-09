import React from 'react';
import PropTypes from 'prop-types';

import './NewTaskForm.css';

export default class NewTaskForm extends React.Component {
  static defaultProps = {
    onAddTask: () => console.log('onAddTask func'),
  };

  static propTypes = {
    onAddTask: PropTypes.func,
  };

  constructor() {
    super();
    this.state = {
      label: '',
    };

    this.onLabelChange = (e) => {
      this.setState({
        label: e.target.value,
      });
    };
    this.onSubmit = (e) => {
      const { label } = this.state;
      const { onAddTask } = this.props;
      e.preventDefault();
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
