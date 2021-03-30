import React from 'react'

export default class TasksFilter extends React.Component {
  constructor() {
    super()
    this.state = {
      selected: 'All'
    }
  }

  render() {
    return (
      <ul className="filters">
          <li>
            <button onClick={() => this.props.onFilterChange('All')}>All</button>
          </li>
          <li>
            <button onClick={() => this.props.onFilterChange('Active')}>Active</button>
          </li>
          <li>
            <button onClick={() => this.props.onFilterChange('Completed')}>Completed</button>
          </li>
      </ul>
    )
  }
}