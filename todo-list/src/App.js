
import React, { useState } from 'react';
import Header from './components/Header';
import ToDoList from './components/ToDoList';
import ToDoForm  from './components/ToDoForm';
import data from './rawData/data';
import './App.css';

function App() {
  const [ toDoList, setToDoList ] = useState(data);

  const handleToggle = (id) => {
    let mapped = toDoList.map(task => {
      let temp = task.id === Number(id) ? {...task, complete: !task.complete} : {...task}
      return temp
    })
    setToDoList(mapped)
  }

  const handleCompleted = (e) => {
    e.preventDefault();
    let filtered = toDoList.filter(task => {
      return !task.complete
    })
    console.log("filtered", filtered)
    setToDoList(filtered)
  }

  const addTask = (userInput) => {
    let newTasklist = [...toDoList]
    newTasklist = [...newTasklist, {id: toDoList.length + 1, task: userInput, complete: false}];

    // Sort new IDs - prevents items from having the same ID.
    newTasklist = newTasklist.map((task, index) => {
      return {...task, id: index + 1}
    })
    setToDoList(newTasklist)
  }

  return (
    <div className="App">
      <Header />
      <p>This is a <i>To Do List</i> made with <a target='_blank' href='https://reactjs.org/' rel='noreferrer'>React</a>. Click on the elements of the list to mark strike them and mark them as completed.</p>
      <ToDoList listItems={toDoList} handleToggle={handleToggle} handleCompleted={handleCompleted} />
      <ToDoForm addTask={addTask} />
    </div>
  );
}

export default App;
