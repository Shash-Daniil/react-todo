import React from 'react'
import ReactDOM from 'react-dom'
import TaskList from './components/TaskList'
import Footer from './components/Footer'
import NewTaskForm from './components/NewTaskForm'

class TodoApp extends React.Component {
    constructor() {
        super()
        this.idMax = 7

        this.state = {
            tasksArr: [
                {id: 1, status: 'completed', text: 'Completed task'},
                {id: 2, status: 'completed', text: 'SUKA'},
                {id: 3, status: 'active', text: 'BLEAT'},
                {id: 4, status: 'active', text: 'IDI NAHUI'},
                {id: 5, status: 'active', text: 'Active task'},
                {id: 6, status: 'active', text: 'Active task'},
            ],
            filter: 'All',
            editingTaskStatus: null
        }

        this.onEditTask = id => {
            this.setState(({tasksArr, editingTaskStatus}) => {
                const index = tasksArr.findIndex(el => el.id === id)
                const newArr = [...tasksArr]
                const {status} = newArr[index]
                
                if (tasksArr.findIndex(el => el.status === 'editing') !== -1)
                    {tasksArr[tasksArr.findIndex(el => el.status === 'editing')].status = editingTaskStatus}

                newArr[index].status = 'editing'

                return {
                    tasksArr: newArr,
                    editingTaskStatus: status
                } 
            })
        }

        this.onFilterChange = (filter) => {
            this.setState({
                filter
            })
        }

        this.onClearCompleted = () => {
            const newArr = this.state.tasksArr.filter(item => item.status !== 'completed')
            this.setState({
                tasksArr: newArr
            })
        }

        this.onAddTask = (text) => {
            const newTask = {id: this.idMax++, status: 'active', text}
            this.setState(({tasksArr}) => {
                const newArr = [...tasksArr, newTask]
                return {
                    tasksArr: newArr
                }
            })
        }

        this.onDeleteTask = id => {
            this.setState(({tasksArr}) => {
                const index = tasksArr.findIndex(el => el.id === id)
                const newArr = [...tasksArr.slice(0, index), ...tasksArr.slice(index + 1)] 
                return {
                    tasksArr: newArr
                }
            })
        }

        this.onComplete = (id) => {
            this.setState(({tasksArr}) => {
                const index = tasksArr.findIndex(el => el.id === id)
                const newArr = [...tasksArr]
                newArr[index].status === 'completed' ? newArr[index].status = 'active' : newArr[index].status = 'completed'
                return {
                    tasksArr: newArr
                }
            })
        }

        this.onEditTaskText = (id, text) => {
            this.setState(({tasksArr}) => {
                const index = tasksArr.findIndex(el => el.id === id)
                const newArr = [...tasksArr]
                newArr[index].text = text
                return {
                    tasksArr: newArr,
                }
            })
        }

        this.onEditTaskTextSubmit = (id) => {
            this.setState(({tasksArr, editingTaskStatus}) => {
                const index = tasksArr.findIndex(el => el.id === id)
                const newArr = [...tasksArr]
                newArr[index].status = editingTaskStatus
                return {
                    tasksArr: newArr
                }
            })
        }
        
    }

    render() {
        const activeCount = this.state.tasksArr.reduce((a, e) => e.status === 'active' ? a+=1 : a+=0, 0)
        return (
            <section className="todoapp">
                <NewTaskForm onAddTask={this.onAddTask}/>
                <section className="main">
                    <TaskList 
                        tasksArr={this.state.tasksArr}
                        onDeleteTask={this.onDeleteTask}
                        onComplete={this.onComplete}
                        filter={this.state.filter}
                        onEditTask={this.onEditTask}
                        onEditTaskText={this.onEditTaskText}
                        onEditTaskTextSubmit={this.onEditTaskTextSubmit}/>
                    <Footer
                        activeCount={activeCount}
                        onClearCompleted={this.onClearCompleted}
                        onFilterChange={this.onFilterChange}/>
                </section>
            </section>
        )
    }
}

ReactDOM.render(<TodoApp />, document.getElementById('app'))