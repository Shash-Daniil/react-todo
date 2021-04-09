import React from 'react';
import PropTypes from 'prop-types';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import './Task.css';

// eslint-disable-next-line react/prefer-stateless-function
export default class Task extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    taskOptions: PropTypes.oneOfType([PropTypes.object]).isRequired,
    onEditTaskTextSubmit: PropTypes.func.isRequired,
    onEditTaskText: PropTypes.func.isRequired,
    onEditTask: PropTypes.func.isRequired,
    onComplete: PropTypes.func.isRequired,
    onDeleteTask: PropTypes.func.isRequired,
  };

  render() {
    const { taskOptions, onComplete, onEditTask, onDeleteTask, onEditTaskTextSubmit, onEditTaskText, id } = this.props;
    return (
      <li className={taskOptions.status}>
        <div className="view">
          {taskOptions.status === 'completed' ? (
            <input className="toggle" type="checkbox" defaultChecked onClick={onComplete} />
          ) : (
            <input className="toggle" type="checkbox" onClick={onComplete} />
          )}
          <label>
            <span className="description">{taskOptions.text}</span>
            <span className="created">{formatDistanceToNow(new Date(), { includeSeconds: true })}</span>
          </label>
          <button label="edit-btn" type="button" className="icon icon-edit" onClick={onEditTask} />
          <button label="delete-btn" type="button" className="icon icon-destroy" onClick={onDeleteTask} />
        </div>
        {taskOptions.status === 'editing' ? (
          <form onSubmit={onEditTaskTextSubmit}>
            <input onChange={(evt) => onEditTaskText(id, evt.target.value)} className="edit" value={taskOptions.text} />
          </form>
        ) : null}
      </li>
    );
  }
}
