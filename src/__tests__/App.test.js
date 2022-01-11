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
})