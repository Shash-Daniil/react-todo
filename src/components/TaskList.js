import React from 'react'
import Task from './Task'


let TaskList = ({ tasksArr }) => {
    let tasks = tasksArr.map(elem => {
        return <Task key={elem.id} taskOptions={elem}/>
    })
    return (
        <ul className="todo-list">
            { tasks }
        </ul>
    )
}

export default TaskList