import React from 'react';
import ToDo from './ToDo'

const ToDoList = ({listItems}) => {
    return (
        <ul
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
        >
            {
              listItems.map(item => {
                  return (
                      <ToDo todo={item} />
                  )
              })
            }
        </ul>
    )
}

export default ToDoList;