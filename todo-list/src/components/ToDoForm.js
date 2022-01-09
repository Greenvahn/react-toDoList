import React, {useState} from "react";

const ToDoForm = ({addTask}) => {
    const [ userInput, setUserInput ] = useState('');
    const [ isValid, setIsValid ] = useState(true)

    const handleChange = (e) => {
        setUserInput(e.currentTarget.value)
        setIsValid(true)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Do not add an item if the imput is empty
        if(!(userInput.length > 0)) {
            setIsValid(false)
            return
        }
        addTask(userInput)
        setUserInput('')
    }

    return (
        <form onSubmit={handleSubmit} className={`form-class ${!isValid ? 'invalid':''}`} data-testid="form">
            <input value={userInput} type="text" onChange={handleChange} placeholder="Enter task..." data-testid="input" />
            <button>Submit</button>
        </form>
    )
}

export default ToDoForm;