import React from 'react'
import ReactDOM from 'react-dom'
import TaskList from './components/TaskList'
import Footer from './components/Footer'
import NewTaskForm from './components/NewTaskForm'

let TodoApp = () => {
    let tasksArr = [
        {id: 1, status: 'completed', text: 'Completed task'},
        {id: 2, status: 'editing', text: 'Editing task'},
        {id: 3, status: 'active', text: 'Active task'},
    ]
    return (
        <section className="todoapp">
            <NewTaskForm />
            <section className="main">
                <TaskList tasksArr={tasksArr}/>
                <Footer />
            </section>
        </section>
    )
}

ReactDOM.render(<TodoApp />, document.getElementById('app'))