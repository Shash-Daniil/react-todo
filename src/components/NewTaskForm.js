import React from 'react'
import PropTypes from 'prop-types';

export default class NewTaskForm extends React.Component {
    constructor() {
        super()
        this.state = {
            label: ''
        }

        this.onLabelChange = (e) => {
            this.setState({
                label: e.target.value
            })
        }
        this.onSubmit = (e) => {
            e.preventDefault()
            this.props.onAddTask(this.state.label)
            this.setState({label: ''})
        }
    }

    static propTypes = {
        onChange: PropTypes.func
    } 

    render() {
        return (
            <header className="header">
                <h1>todos</h1>
                <form onSubmit={this.onSubmit}>
                    <input className="new-todo" placeholder="What needs to be done?" autoFocus
                    onChange={this.onLabelChange}
                    value={this.state.label}
                    />
                </form>
            </header>
        )
    }
}