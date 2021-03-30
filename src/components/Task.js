import React from 'react'
import PropTypes from 'prop-types';

export default class Task extends React.Component{
    constructor() {
        super()

    }

    static propTypes = {
        id: PropTypes.number,
        taskOptions: PropTypes.object,
        onEditTaskTextSubmit: PropTypes.func,
        onEditTaskText: PropTypes.func,
        onEditTask: PropTypes.func,
        onComplete: PropTypes.func,
        onDeleteTask: PropTypes.func
    }

    render() {
        const formatDistanceToNow = require('date-fns/formatDistanceToNow')
        return (
            <li className={ this.props.taskOptions.status }>
                <div className="view">
                    { this.props.taskOptions.status === 'completed' ? <input className="toggle" type="checkbox" defaultChecked onClick={this.props.onComplete}/> 
                    : <input className="toggle" type="checkbox" onClick={this.props.onComplete}/> }
                    <label>
                        <span className="description">{ this.props.taskOptions.text }</span>
                        <span className="created">{ formatDistanceToNow(new Date(), {includeSeconds: true}) }</span>
                    </label>
                    <button className="icon icon-edit" onClick={this.props.onEditTask} />
                    <button className="icon icon-destroy" onClick={ this.props.onDeleteTask } />
                </div>
                { this.props.taskOptions.status === 'editing' ?
                 <form onSubmit={this.props.onEditTaskTextSubmit}><input onChange={(e) => this.props.onEditTaskText(this.props.id, e.target.value)} className="edit" value={ this.props.taskOptions.text }/></form> : null}
            </li>
        )
    }
}