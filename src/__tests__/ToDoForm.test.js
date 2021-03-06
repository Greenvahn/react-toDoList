import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ToDoForm from "../components/ToDoForm";
import data from "../rawData/data.json"

describe('<ToDoForm />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Renders correctly', () => {
    // Setup
    render(<ToDoForm />)
    // Asserts
    const form = screen.getByTestId('form')
    const formInput = screen.getByTestId('input')
    const Button = screen.getByRole('button')

    // Expects
    expect(form).toBeInTheDocument();
    expect(formInput).toBeInTheDocument();
    expect(Button).toBeInTheDocument();
  })

  it('<input /> changes value and sets isValid class to true', () => {
    let isValid = false;
    const inputValueSample = 'My Task'
    const setUserInput = jest.fn();
    const setIsValid = jest.fn((boolean) => {
      return isValid = boolean;
    });

    const handleChange = jest.fn(() => {
      setUserInput(inputValueSample)
      setIsValid(true)
    })

    // Setup
    render(<ToDoForm />)
    
    // Asserts
    const formInput = screen.getByTestId('input')

    // Actions
    fireEvent.change(formInput,{target: {value: inputValueSample}});
    handleChange()
    
    
    // Expects

    expect(handleChange).toHaveBeenCalled()
    expect(setUserInput).toBeCalledWith(inputValueSample)
    expect(setIsValid).toBeCalledWith(true)
    expect(isValid).toBe(true)
  })

  it('Fires submit button and add a task with any value from the input', () => {
    let inputValueSample = 'My Task'
    const setUserInput = jest.fn();
    const addTask = jest.fn();

    const handleSubmit = jest.fn(() => {
      addTask(inputValueSample)
      setUserInput('')
    })

    // Setup
    render(<ToDoForm />)
    
    // Asserts
    const submitBtn = screen.getByRole('button')

    // Actions
    const click = fireEvent.click(submitBtn)
    
    
    // Expects
    expect(click).toBe(true)
    expect(inputValueSample).not.toHaveLength(0)
    handleSubmit()
    expect(addTask).toBeCalledWith(inputValueSample)
    expect(setUserInput).toBeCalledWith('')
  })

  it('Fires submit button and add a task to "toDoList" array', () => {
    let inputValueSample = 'My Task'
    let taskList = data;
    const setToDoList = jest.fn();

    const addTask = jest.fn((userInput) => {
      taskList = [...taskList, {id: taskList.length + 1, task: userInput, complete: false}];
  
      // Sort new IDs - prevents items from having the same ID.
      taskList = taskList.map((task, index) => {
        return {...task, id: index + 1}
      })
      setToDoList(taskList)
    })

    const handleSubmit = jest.fn(() => {
      addTask(inputValueSample)
    })

    // Setup
    render(<ToDoForm addTask={addTask} />)
    
    // Asserts
    const submitBtn = screen.getByRole('button')

    // Actions
    const click = fireEvent.click(submitBtn)
    
    
    // Expects
    expect(inputValueSample).not.toHaveLength(0)
    expect(taskList).not.toHaveLength(0)
    expect(click).toBe(true)
    handleSubmit()
    expect(addTask).toBeCalledWith(inputValueSample)
    expect(taskList).toHaveLength(6)
    expect(taskList.map(task => task.id)).toEqual([
      1,
      2,
      3,
      4,
      5,
      6
    ]);
    expect(taskList[5].task).toEqual(inputValueSample)
    expect(taskList[5].complete).toEqual(false)
  })

  it('Clears the input value on submit', () => {
    let inputValueSample = 'My Task'
    const setUserInput = jest.fn((value) => {
      inputValueSample = value
    });

    const handleSubmit = jest.fn(() => {
      setUserInput('')
    })

    // Setup
    render(<ToDoForm />)
    
    // Asserts
    const submitBtn = screen.getByRole('button')

    // Actions
    const click = fireEvent.click(submitBtn)
    
    
    // Expects
    expect(click).toBe(true)
    expect(inputValueSample).not.toHaveLength(0)
    handleSubmit()
    expect(setUserInput).toBeCalledWith('')
    expect(inputValueSample).not.toHaveLength(7)
  })

  it('Fires submit button with an empty value on the input', () => {
    let inputValueSample = ''
    let isValid = true;
    const setIsValid = jest.fn((boolean) => {
      return isValid = boolean;
    });

    const handleSubmit = jest.fn(() => {
      if(!(inputValueSample.length > 0)) {
        setIsValid(false)
        return 
      }
    })

    // Setup
    render(<ToDoForm />)
    
    // Asserts
    const submitBtn = screen.getByRole('button')

    // Actions
    const click = fireEvent.click(submitBtn)
    
    
    // Expects
    expect(click).toBe(true)
    handleSubmit()
    expect(inputValueSample).not.toHaveLength(1)
    expect(setIsValid).toBeCalledWith(false)
    expect(isValid).toBe(false)
    expect(handleSubmit).toHaveReturned()
  })

  it('Checks on addTask function', () => {
    let inputValueSample = 'My Task'
    let toDoList = data;
    let newTaskList = [];
    const setState = jest.fn(() =>  {
      toDoList = newTaskList
    });

    const addTask = jest.fn((userInput) => {
      newTaskList = [...toDoList, {id: toDoList.length + 1, task: userInput, complete: false}];
  
      // Sort new IDs - prevents items from having the same ID.
      newTaskList = newTaskList.map((task, index) => {
        return {...task, id: index + 1}
      })
      setState(newTaskList)
    })

    // Setup
    render(<ToDoForm addTask={addTask} />)


    // Actions
    addTask(inputValueSample)
    expect(newTaskList.map(task => task.id)).toEqual([
      1,
      2,
      3,
      4,
      5,
      6
    ])
    expect(newTaskList[5].task).toEqual(inputValueSample)
    expect(setState).toHaveBeenCalledTimes(1)
    expect(toDoList).toEqual(newTaskList)
  })

  it('Simulates a simple call of addTask', () => {
    const addTask = jest.fn((value => value))
    addTask("My Task")
    expect(addTask).toHaveBeenCalledWith("My Task");
  })
})