import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('renders Task Management App title', () => {
    render(<App />);
    const titleElement = screen.getByText(/Task Management App/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('adds a new task', () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText(/Add a task/i);
    const addButton = screen.getByText(/Add Task/i);

    fireEvent.change(inputElement, { target: { value: 'New Task' } });
    fireEvent.click(addButton);

    const taskElement = screen.getByText(/New Task/i);
    expect(taskElement).toBeInTheDocument();
  });

  test('deletes a task', () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText(/Add a task/i);
    const addButton = screen.getByText(/Add Task/i);

    fireEvent.change(inputElement, { target: { value: 'Task to Delete' } });
    fireEvent.click(addButton);

    const deleteButton = screen.getByText(/Delete/i);
    fireEvent.click(deleteButton);

    const taskElement = screen.queryByText(/Task to Delete/i);
    expect(taskElement).not.toBeInTheDocument();
  });

  test('filters tasks by priority', () => {
      render(<App />);
      const inputElement = screen.getByPlaceholderText(/Add a task/i);
      const addButton = screen.getByText(/Add Task/i);
      const prioritySelect = screen.getByRole('combobox');

      fireEvent.change(inputElement, { target: { value: 'High Priority Task' } });
      fireEvent.change(prioritySelect, { target: { value: 'High' } });
      fireEvent.click(addButton);

      fireEvent.change(inputElement, { target: { value: 'Low Priority Task' } });
      fireEvent.change(prioritySelect, { target: { value: 'Low' } });
      fireEvent.click(addButton);

      fireEvent.change(prioritySelect, { target: { value: 'High' } });
      const highPriorityTask = screen.getByText(/High Priority Task/i);
      expect(highPriorityTask).toBeInTheDocument();

      const lowPriorityTask = screen.queryByText(/Low Priority Task/i);
      expect(lowPriorityTask).not.toBeInTheDocument();
  });

  test('toggles task completion', () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText(/Add a task/i);
    const addButton = screen.getByText(/Add Task/i);

    fireEvent.change(inputElement, { target: { value: 'Task to Complete' } });
    fireEvent.click(addButton);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(checkbox.checked).toBe(true);
  });
});