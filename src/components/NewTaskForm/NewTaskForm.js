import React from 'react';
import PropTypes from 'prop-types';

export default class NewTaskForm extends React.Component {
  static propTypes = {
    onAddTask: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
      label: '',
      min: '',
      sec: '',
    };

    this.onLabelChange = (event, stateValue, onlyNum = false) => {
      const { value } = event.target;

      if (this.inputValidation(value, onlyNum)) {
        return this.setState({
          [stateValue]: event.target.value,
        });
      }
      return false;
    };

    this.onLabelSubmit = (event) => {
      event.preventDefault();
      const { label, min, sec } = this.state;
      if (label.length === 0) {
        return;
      }
      const { onAddTask } = this.props;
      let timerFlag = false;

      if (min.length !== 0 || sec.length !== 0) {
        timerFlag = true;
      }

      onAddTask(label, min, sec, timerFlag);
      this.setState({ label: '', min: '', sec: '' });
    };

    this.onKeyPress = (event) => {
      if (event.key === 'Enter') {
        this.onLabelSubmit(event);
      }
    };

    this.inputValidation = (value, onlyNum) => !onlyNum || !Number.isNaN(+value);
  }

  /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
  render() {
    const { label, min, sec } = this.state;
    return (
      <header className="header">
        <h1>todos</h1>
        <form onKeyPress={this.onKeyPress} className="new-todo-form">
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={(event) => this.onLabelChange(event, 'label')}
            value={label}
          />
          <input
            className="new-todo-form__timer"
            placeholder="Min"
            onChange={(event) => this.onLabelChange(event, 'min', true)}
            value={min}
          />
          <input
            className="new-todo-form__timer"
            placeholder="Sec"
            onChange={(event) => this.onLabelChange(event, 'sec', true)}
            value={sec}
          />
        </form>
      </header>
    );
  }
}
