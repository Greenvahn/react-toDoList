import React from 'react';
import ToDo from './ToDo'
import Button from './ButtonClear';

const ToDoList = ({listItems, handleToggle, handleCompleted}) => {
    return (
        <ul
        aria-labelledby="list-heading"
        >
            {
              listItems.map((item) => {
                  return (
                      <ToDo key={'t'+item.id} todo={item} handleToggle={handleToggle} />
                  )
              })
            }
            <Button handleCompleted={handleCompleted} />
        </ul>
    )
}

export default ToDoList;