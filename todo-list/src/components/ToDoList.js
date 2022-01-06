import React from 'react';
import ToDo from './ToDo'

const ToDoList = ({listItems, handleToggle, handleCompleted}) => {
    return (
        <ul
        aria-labelledby="list-heading"
        >
            {
              listItems.map((item) => {
                  return (
                      <ToDo key={item.id} todo={item} handleToggle={handleToggle} />
                  )
              })
            }
            <button style={{margin: '20px'}} onClick={handleCompleted}>Clear Completed</button>
        </ul>
    )
}

export default ToDoList;