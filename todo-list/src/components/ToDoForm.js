import React, {useState} from "react";

const ToDoForm = ({addTask}) => {
    const [ userInput, setUserInput ] = useState('');

    const handleChange = (e) => {
        setUserInput(e.currentTarget.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Do not add an item if the imput is empty
        if(!(userInput.length > 0)) {
            return false
        }
        addTask(userInput)
        setUserInput('')
    }

    return (
        <form onSubmit={handleSubmit}>
            <input value={userInput} type="text" onChange={handleChange} placeholder="Enter task..."/>
            <button>Submit</button>
        </form>
    )
}

export default ToDoForm;