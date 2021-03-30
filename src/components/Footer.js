import React from 'react'
import PropTypes from 'prop-types';
import TasksFilter from './TasksFilter'

const Footer = ({activeCount, onClearCompleted, onFilterChange}) => (
        <footer className="footer">
            <span className="todo-count">{activeCount} {activeCount === 1 ? 'item' : 'items'} left</span>
            <TasksFilter onFilterChange={onFilterChange}/>
            <button className="clear-completed" onClick={onClearCompleted}>Clear completed</button>
        </footer>
    )

Footer.defaultProps = {
    activeCount: 9999,
    onClearCompleted: () => console.log('clear completed'),
    onFilterChange: () => console.log('filter change')
}

Footer.propTypes = {
    activeCount: PropTypes.number,
    onClearCompleted: PropTypes.func,
    onFilterChange: PropTypes.func
}

export default Footer