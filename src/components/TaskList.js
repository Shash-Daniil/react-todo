import React from 'react'
import Task from './Task'


const TaskList = ({ tasksArr, onDeleteTask, onComplete, filter, onEditTask, onEditTaskText, onEditTaskTextSubmit}) => {
    const tasks = tasksArr.map(elem => {
        if (filter === 'All' || elem.status === filter.toLowerCase())
            {return <Task id={elem.id} key={elem.id} taskOptions={elem} 
            onDeleteTask={ () => onDeleteTask(elem.id) }
            onComplete={ () => onComplete(elem.id)}
            onEditTask={ () => onEditTask(elem.id)}
            onEditTaskText={onEditTaskText}
            onEditTaskTextSubmit={() => onEditTaskTextSubmit(elem.id)}/>}
    })
    return (
        <ul className="todo-list">
            { tasks }
        </ul>
    )
}

export default TaskList