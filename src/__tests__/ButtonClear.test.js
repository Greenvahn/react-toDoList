import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ButtonClear from "../components/ButtonClear"

describe('<ButtonClear />', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('Renders correctly',() => {
    let filtered = []
    const setToDoList = jest.fn();
    const toDoList = [{ id: 1, complete: false, task:'Any' }, { id: 2, complete: false, task:'Any' }]
    const handleCompleted = jest.fn(() => {
        filtered = toDoList.filter(task => {
          return !task.complete
        })
        setToDoList(filtered);
    });


    render(<ButtonClear onClick={handleCompleted}/>)

    // Assert
    const button = screen.getByRole('button')

    // Expect
    expect(button).toBeInTheDocument();
    expect(fireEvent.click(button)).toBe(true)
    handleCompleted()
    expect(filtered).not.toHaveLength(0)
    expect(setToDoList).toBeCalledWith(filtered)
  })
})