import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import data from '../rawData/data.json';
import App from "../App"

describe('<App.js />', () => {
  it('the task data is correct', () => {
    expect(data).toMatchSnapshot();
    expect(data).toHaveLength(data.length);
    expect(data.map(item => item.task)).toEqual([
      'Give dog a bath',
      'Do laundry',
      'Vacuum floor',
      'Feed cat',
      'Change light bulbs'
    ]);
  });

  
  it('Renders correctly', () => {

    // Arrange
    render(<App />)

    // Assert
    const items = screen.getAllByRole("listitem")
    const submit_button = screen.getByTestId("submit-btn")
    const list = screen.getByRole("list")
    const form = screen.getByTestId('form')
    const formInput = screen.getByTestId('input')

    // Expect
    expect(list).toBeInTheDocument();
    expect(items).not.toHaveLength(0)
    expect(submit_button).toBeInTheDocument();
    expect(form).toBeInTheDocument();
    expect(formInput).toBeInTheDocument();
  })

  it('Checks on handleToggle function', () =>{
    // Setup
    const toDoList = data;
    let mapped = [];
    const setToDoList = jest.fn()
    const handleToggle = jest.fn((value) =>{
      mapped = toDoList.map(task => {
        let temp = task.id === Number(value) ? {...task, complete: !task.complete} : {...task}
        return temp
      })
      setToDoList(mapped)
    })

    render(<App />)

    // Assert
    const item = screen.getByText("Do laundry")

    // Action
    fireEvent.click(item)
    handleToggle(item.id)


    // Expectations
    expect(handleToggle).toHaveBeenCalledWith("2");
    expect(setToDoList).toHaveBeenCalledWith(mapped);
    expect(mapped[1].task).toEqual('Do laundry')
    expect(mapped[1].complete).toEqual(false)
  })

  it('Checks the handleCompleted function', () =>{
    let toDoList = data;
    let filtered = [];
    const setToDoList = jest.fn(() => {
      toDoList = filtered;
    });
    const handleCompleted = jest.fn(() => {
      filtered = toDoList.filter(task => {
        return !task.complete
      })
      setToDoList(filtered)
    })
    
    render(<App />)

    // Asserts
    const clearButton = screen.getByText('Clear Completed')

    fireEvent.click(clearButton)
    expect(toDoList).toHaveLength(data.length);
    expect(filtered).toEqual([])
    handleCompleted()
    expect(filtered.map(task => task.complete)).toEqual([
      false,
      false
    ])
    expect(setToDoList).toHaveBeenCalledWith(filtered)
    expect(toDoList).toHaveLength(filtered.length)
  })

  it('Checks the addTask function', () => {
    // Setup
    let toDoList = data;
    let userInput = 'My Task';
    let newTasklist = [];
    const setUserInput = jest.fn();
    const setToDoList = jest.fn();
    const addTask = jest.fn((userInput) =>{
      newTasklist = [...toDoList]
      newTasklist = [...newTasklist, {id: toDoList.length + 1, task: userInput, complete: false}];
  
      // Sort new IDs - prevents items from having the same ID.
      newTasklist = newTasklist.map((task, index) => {
        return {...task, id: index + 1}
      })
      setToDoList(newTasklist)
    })

    const handleSubmit = jest.fn(() => {
      addTask(userInput)
      setUserInput('')
    })

    render(<App />)

    // Asserts
    const form = screen.getByTestId("form")

    // Actions
    fireEvent.submit(form)
    expect(newTasklist).toEqual([])
    expect(toDoList).toHaveLength(data.length);
    handleSubmit()
    expect(newTasklist = [
      ...toDoList,
      {
        id: toDoList.length + 1,
        task: 'My Task',
        complete: false
      }
    ]).toHaveLength(toDoList.length + 1)
    expect(newTasklist.map(task => task.id)).toEqual([
      1,
      2,
      3,
      4,
      5,
      6
    ])
    expect(setToDoList).toHaveBeenCalledWith(newTasklist)
  })
})