import React from 'react';
import TaskList from './components/TaskList';
import Footer from './components/Footer';
import NewTaskForm from './components/NewTaskForm';

class App extends React.Component {
  constructor() {
    super();
    this.idMax = 7;

    this.state = {
      tasksArr: [
        { id: 1, status: 'completed', text: 'Completed task' },
        { id: 2, status: 'completed', text: 'lol' },
        { id: 3, status: 'active', text: 'tasdasdasd' },
        { id: 4, status: 'active', text: 'task6' },
        { id: 5, status: 'active', text: 'Active task2' },
        { id: 6, status: 'active', text: 'Active task6' },
      ],
      filter: 'All',
      editingTaskStatus: null,
    };

    this.onEditTask = (id) => {
      this.setState(({ tasksArr, editingTaskStatus }) => {
        const tmp = [...tasksArr];
        const index = tasksArr.findIndex((el) => el.id === id);
        const newArr = [...tasksArr];
        const { status } = newArr[index];

        if (tmp.findIndex((el) => el.status === 'editing') !== -1) {
          tmp[tmp.findIndex((el) => el.status === 'editing')].status = editingTaskStatus;
        }

        newArr[index].status = 'editing';

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
      const newArr = tasksArr.filter((item) => item.status !== 'completed');
      this.setState({
        tasksArr: newArr,
      });
    };

    this.onAddTask = (text) => {
      const newTask = { id: (this.idMax += 1), status: 'active', text };
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
        newArr[index].status = newArr[index].status === 'completed' ? 'active' : 'completed';
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
    const activeCount = tasksArr.reduce((acc, elem) => (elem.status === 'active' ? acc + 1 : acc), 0);
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
