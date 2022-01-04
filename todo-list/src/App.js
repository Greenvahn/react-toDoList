
import React, { useState } from 'react';
import Header from './components/Header';
import ToDoList from './components/ToDoList';
import data from './rawData/data';
import './App.css';

function App() {
  const [ toDoList ] = useState(data);
  
  return (
    <div className="App">
      <Header />
      <ToDoList listItems={toDoList} />
    </div>
  );
}

export default App;
