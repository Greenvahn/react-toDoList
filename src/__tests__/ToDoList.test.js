import React from "react";
import { render, screen } from "@testing-library/react";
import ToDoList from "../components/ToDoList"

describe('<ToDoList />', () => {
  it('Renders a list of taks and a button', () => {
    const listItems = [{ id: 1, complete: false, task:'Any' }, { id: 2, complete: false, task:'Any' }]

    // Arrange
    render(<ToDoList listItems={listItems} />)

    // Assert
    const items = screen.getAllByRole("listitem")
    const button = screen.getByRole("button")
    const list = screen.getByRole("list")

    // Expect
    expect(list).toBeInTheDocument();
    expect(items).not.toHaveLength(0)
    expect(button).toBeInTheDocument();
  })
})