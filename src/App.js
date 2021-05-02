import React, { useState } from 'react';
import TaskList from './components/TaskList';
import Footer from './components/Footer';
import NewTaskForm from './components/NewTaskForm';
import { ACTIVE, COMPLETED, EDITING } from './const_strings/statuses';

const App = () => {
  let idMax = 7;
  const [tasksArr, setTasksArr] = useState([
    { id: 1, status: COMPLETED, text: 'one', timerFlag: false },
    { id: 2, status: COMPLETED, text: 'two', timerFlag: false },
    { id: 3, status: ACTIVE, text: 'three', timerFlag: false },
  ]);
  const [filter, setFilter] = useState('All');
  const [editingTaskStatus, setEditingTaskStatus] = useState(null);

  const onEditTask = (id) => {
    const index = tasksArr.findIndex((el) => el.id === id);
    const newArr = [...tasksArr];
    const { status } = newArr[index];

    if (newArr.findIndex((el) => el.status === EDITING) !== -1) {
      newArr[newArr.findIndex((el) => el.status === EDITING)].status = editingTaskStatus;
    }
    newArr[index].status = EDITING;

    setTasksArr(newArr);
    setEditingTaskStatus(status);
  };
  const onFilterChange = (fltr) => {
    setFilter(fltr);
  };
  const onClearCompleted = () => {
    const newArr = tasksArr.filter((item) => item.status !== COMPLETED);
    setTasksArr(newArr);
  };
  const onAddTask = (text, min, sec, timerFlag) => {
    const newTask = { id: (idMax += 1), status: ACTIVE, text, min, sec, timerFlag };
    const newArr = [...tasksArr, newTask];
    setTasksArr(newArr);
  };
  const onDeleteTask = (id) => {
    const index = tasksArr.findIndex((el) => el.id === id);
    const newArr = [...tasksArr.slice(0, index), ...tasksArr.slice(index + 1)];
    setTasksArr(newArr);
  };
  const onComplete = (id) => {
    const index = tasksArr.findIndex((el) => el.id === id);
    const newArr = [...tasksArr];
    newArr[index].status = newArr[index].status === COMPLETED ? ACTIVE : COMPLETED;
    setTasksArr(newArr);
  };
  const onEditTaskText = (id, text) => {
    const index = tasksArr.findIndex((el) => el.id === id);
    const newArr = [...tasksArr];
    newArr[index].text = text;
    setTasksArr(newArr);
  };
  const onEditTaskTextSubmit = (id) => {
    const index = tasksArr.findIndex((el) => el.id === id);
    const newArr = [...tasksArr];
    newArr[index].status = editingTaskStatus;
    setTasksArr(newArr);
  };

  const activeCount = tasksArr.reduce((acc, elem) => (elem.status === ACTIVE ? acc + 1 : acc), 0);

  return (
    <section className="todoapp">
      <NewTaskForm onAddTask={onAddTask} />
      <section className="main">
        <TaskList
          tasksArr={tasksArr}
          onDeleteTask={onDeleteTask}
          onComplete={onComplete}
          filter={filter}
          onEditTask={onEditTask}
          onEditTaskText={onEditTaskText}
          onEditTaskTextSubmit={onEditTaskTextSubmit}
        />
        <Footer
          filter={filter}
          activeCount={activeCount}
          onClearCompleted={onClearCompleted}
          onFilterChange={onFilterChange}
        />
      </section>
    </section>
  );
};

export default App;
