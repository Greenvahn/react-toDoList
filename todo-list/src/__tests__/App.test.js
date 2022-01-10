import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App"

describe('<App.js />', () => {
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
})