import { render, screen } from '@testing-library/react'
import Header from '../components/Header'

// Writting tests = The Three "A"s
// * Arrange --> Set up the test data, test conditions and test environment
// * Act --> Run logic that should be tested (e.g execute function)
// * Assert --> Compare execution results with exptected results


// Create testing suite by using describe('') function
describe('<Header />', () => {
    test('renders Header - To Do List', () => {

        // Arrange
        render(<Header />);
        
        // Act
        // ... nothing here
      
        // Assert
       const ToDoList = screen.getByText('To Do List', { exact: false})
       expect(ToDoList).toBeInTheDocument();
      });
})


