import React from 'react'

let Task = ({ taskOptions }) => {
    var formatDistanceToNow = require('date-fns/formatDistanceToNow')

    return (
        <li className={ taskOptions.status }>
            <div className="view">
                <input className="toggle" type="checkbox" />
                <label>
                    <span className="description">{ taskOptions.text }</span>
                    <span className="created">{ formatDistanceToNow(new Date()) }</span>
                </label>
                <button className="icon icon-edit"></button>
                <button className="icon icon-destroy"></button>
            </div>
            { taskOptions.status === 'editing' ?
             <input type="text" className="edit" value="Editing task" readOnly/> : null}
        </li>
    )
}

export default Task