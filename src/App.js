import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  const [filterPriority, setFilterPriority] = useState('All');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (newTask) => {
    newTask.id = uuidv4();
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = filterPriority === 'All'
    ? tasks
    : tasks.filter(task => task.priority === filterPriority);

  return (
    <div className="container">
      <h1>Task Management App</h1>
       <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
         <option value="All">All Priorities</option>
         <option value="High">High</option>
         <option value="Medium">Medium</option>
         <option value="Low">Low</option>
       </select>
      <TaskForm addTask={addTask} />
      <TaskList
        tasks={filteredTasks}
        deleteTask={deleteTask}
        toggleComplete={toggleComplete}
      />
    </div>
  );
}

export default App;