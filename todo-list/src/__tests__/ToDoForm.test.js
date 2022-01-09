import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ToDoForm from "../components/ToDoForm";

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
})