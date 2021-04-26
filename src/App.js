import React from 'react';
import TaskList from './components/TaskList';
import Footer from './components/Footer';
import NewTaskForm from './components/NewTaskForm';
import { ACTIVE, COMPLETED, EDITING } from './const_strings/statuses';

class App extends React.Component {
  constructor() {
    super();
    this.idMax = 7;

    this.state = {
      tasksArr: [
        { id: 1, status: COMPLETED, text: 'one', timerFlag: false },
        { id: 2, status: COMPLETED, text: 'two', timerFlag: false },
        { id: 3, status: ACTIVE, text: 'three', timerFlag: false },
      ],
      filter: 'All',
      editingTaskStatus: null,
    };

    this.onEditTask = (id) => {
      this.setState(({ tasksArr, editingTaskStatus }) => {
        const index = tasksArr.findIndex((el) => el.id === id);
        const newArr = [...tasksArr];
        const { status } = newArr[index];

        if (newArr.findIndex((el) => el.status === EDITING) !== -1) {
          newArr[newArr.findIndex((el) => el.status === EDITING)].status = editingTaskStatus;
        }

        newArr[index].status = EDITING;

        return {
          tasksArr: newArr,
          editingTaskStatus: status,
        };
      });
    };

    this.onFilterChange = (filter) => {
      this.setState({
        filter,
      });
    };

    this.onClearCompleted = () => {
      const { tasksArr } = this.state;
      const newArr = tasksArr.filter((item) => item.status !== COMPLETED);
      this.setState({
        tasksArr: newArr,
      });
    };

    this.onAddTask = (text, min, sec, timerFlag) => {
      const newTask = { id: (this.idMax += 1), status: ACTIVE, text, min, sec, timerFlag };
      this.setState(({ tasksArr }) => {
        const newArr = [...tasksArr, newTask];
        return {
          tasksArr: newArr,
        };
      });
    };

    this.onDeleteTask = (id) => {
      this.setState(({ tasksArr }) => {
        const index = tasksArr.findIndex((el) => el.id === id);
        const newArr = [...tasksArr.slice(0, index), ...tasksArr.slice(index + 1)];
        return {
          tasksArr: newArr,
        };
      });
    };

    this.onComplete = (id) => {
      this.setState(({ tasksArr }) => {
        const index = tasksArr.findIndex((el) => el.id === id);
        const newArr = [...tasksArr];
        newArr[index].status = newArr[index].status === COMPLETED ? ACTIVE : COMPLETED;
        return {
          tasksArr: newArr,
        };
      });
    };

    this.onEditTaskText = (id, text) => {
      this.setState(({ tasksArr }) => {
        const index = tasksArr.findIndex((el) => el.id === id);
        const newArr = [...tasksArr];
        newArr[index].text = text;
        return {
          tasksArr: newArr,
        };
      });
    };

    this.onEditTaskTextSubmit = (id) => {
      this.setState(({ tasksArr, editingTaskStatus }) => {
        const index = tasksArr.findIndex((el) => el.id === id);
        const newArr = [...tasksArr];
        newArr[index].status = editingTaskStatus;
        return {
          tasksArr: newArr,
        };
      });
    };
  }

  render() {
    const { tasksArr, filter } = this.state;
    const activeCount = tasksArr.reduce((acc, elem) => (elem.status === ACTIVE ? acc + 1 : acc), 0);
    return (
      <section className="todoapp">
        <NewTaskForm onAddTask={this.onAddTask} />
        <section className="main">
          <TaskList
            tasksArr={tasksArr}
            onDeleteTask={this.onDeleteTask}
            onComplete={this.onComplete}
            filter={filter}
            onEditTask={this.onEditTask}
            onEditTaskText={this.onEditTaskText}
            onEditTaskTextSubmit={this.onEditTaskTextSubmit}
          />
          <Footer
            filter={filter}
            activeCount={activeCount}
            onClearCompleted={this.onClearCompleted}
            onFilterChange={this.onFilterChange}
          />
        </section>
      </section>
    );
  }
}

export default App;
