import React from 'react';

const ToDo = ({todo, handleToggle}) => {

    const handleClick = (e) => {
        e.preventDefault()
        handleToggle(e.currentTarget.id)
    }

    return (
        <li 
        id={todo.id}
        className={todo.complete ? "todo strike": ""} 
        onClick={handleClick}
        >
            {todo.task}
        </li>
    )
}

export default ToDo;