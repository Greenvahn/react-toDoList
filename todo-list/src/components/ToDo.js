import React from 'react';

const ToDo = ({todo}) => {
    return (
        <li className='{todo.complete ? "strike": ""}'>
            {todo.task}
        </li>
    )
}

export default ToDo;