import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import ToDo from '../components/ToDo'

// Writting tests = The Three "A"s
// * Arrange --> Set up the test data, test conditions and test environment
// * Act --> Run logic that should be tested (e.g execute function)
// * Assert --> Compare execution results with exptected results


// Create testing suite by using describe('') function
describe('ToDo component', () => {
  it('renders correctly', () => {
    // Setup
    const todo = { id: 1, complete: false, task:'Any' };
    // Arrange
    render(<ToDo todo={todo} />);
      
    // Assert
    const listItems = screen.getAllByRole('listitem');
    const item = screen.getByRole('listitem');


    // Expect
    expect(listItems).not.toHaveLength(0) // > 0
    expect(item).toBeInTheDocument();
    expect(item).toHaveTextContent(todo.task); // Have some text
  });

  it('toggles "complete" status on click', () => {
    // Setup
    const todo = { id: 1, complete: false, task:'Any' };
    const handleClick = jest.fn((e) => {
      e.preventDefault();
      handleToggle(e.currentTarget.id);
    });
    const handleToggle = jest.fn(() => {
      // Mocks toggle "complete" value
      return todo.complete = !todo.complete;
    });
            
    // Arrange
    render(<ToDo todo={todo} handleToggle={handleToggle} onClick={handleClick} />);

    // Assert
    const item = screen.getByRole('listitem');

    // Expectations / action
    expect(fireEvent.click(item)).toBe(false)
    expect(handleToggle).toBeCalledWith(String(todo.id))
    expect(todo.complete).toBe(todo.complete)
  })
})
